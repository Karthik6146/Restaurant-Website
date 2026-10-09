import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { Simulate } from "react-dom/test-utils";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { vi } from "vitest";
import BookingForm from "./booking/BookingForm";
import NewsletterSignup from "./engagement/NewsletterSignup";
import MenuCarousel from "./menu/MenuCarousel";
import LazyImage from "./common/LazyImage";
import ThemeProvider, { ThemeContext } from "../context/ThemeContext";

const firebaseState = vi.hoisted(() => ({ db: {} }));
vi.mock("../utils/firebase", () => ({
  get db() {
    return firebaseState.db;
  },
}));
vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  collection: vi.fn((db, name) => name),
  serverTimestamp: () => "server-time",
}));
global.IS_REACT_ACT_ENVIRONMENT = true;
let container, root;
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 9, 9, 16, 0));
  firebaseState.db = {};
  vi.clearAllMocks();
  collection.mockImplementation((db, name) => name);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.documentElement.classList.remove("dark");
});
const render = (component) => act(() => root.render(component));
function change(id, value) {
  const input = container.querySelector(`#${id}`);
  act(() => {
    input.value = value;
    Simulate.change(input);
  });
}
function fillBooking() {
  change("booking-date", "2026-10-10");
  change("booking-time", "18:00");
  change("booking-name", " Alex ");
  change("booking-email", "alex@example.com");
}
const submit = () =>
  container
    .querySelector("form")
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

test("unconfigured booking disables sending and never writes", async () => {
  firebaseState.db = null;
  render(<BookingForm />);
  expect(container.textContent).toContain("no details will be sent or saved");
  expect(container.querySelector('button[type="submit"]').disabled).toBe(true);
  fillBooking();
  await act(async () => submit());
  expect(addDoc).not.toHaveBeenCalled();
});
test("invalid or elapsed requests never reach Firestore", async () => {
  render(<BookingForm />);
  fillBooking();
  change("booking-name", "   ");
  await act(async () => submit());
  expect(container.querySelector('[role="alert"]').textContent).toMatch(/name/);
  expect(addDoc).not.toHaveBeenCalled();
});
test("booking awaits persistence, prevents duplicate submits and never confirms a table", async () => {
  let resolve;
  addDoc.mockReturnValue(
    new Promise((done) => {
      resolve = done;
    }),
  );
  render(<BookingForm />);
  fillBooking();
  await act(async () => {
    submit();
    submit();
    await vi.dynamicImportSettled();
  });
  expect(addDoc).toHaveBeenCalledTimes(1);
  expect(addDoc).toHaveBeenCalledWith(
    "reservations",
    expect.objectContaining({
      name: "Alex",
      partySize: 2,
      status: "requested",
      createdAt: "server-time",
    }),
  );
  expect(container.querySelector("fieldset").disabled).toBe(true);
  expect(container.querySelector('[role="status"]')).toBeNull();
  await act(async () => resolve({ id: "request-1" }));
  expect(container.querySelector('[role="status"]').textContent).toContain(
    "not confirmed yet",
  );
  expect(container.querySelector("#booking-name").value).toBe("");
});
test("failed booking preserves entered data and offers a retry", async () => {
  addDoc.mockRejectedValue(new Error("permission-denied"));
  render(<BookingForm />);
  fillBooking();
  await act(async () => submit());
  expect(container.querySelector('[role="alert"]').textContent).toContain(
    "couldn't save",
  );
  expect(container.querySelector("#booking-name").value).toBe(" Alex ");
  expect(container.querySelector('button[type="submit"]').disabled).toBe(false);
});
test("changing date clears the previous time", () => {
  render(<BookingForm />);
  fillBooking();
  change("booking-date", "2026-10-11");
  expect(container.querySelector("#booking-time").value).toBe("");
});
test("newsletter unavailable state cannot falsely claim subscription", async () => {
  firebaseState.db = null;
  render(<NewsletterSignup />);
  expect(container.querySelector("button").disabled).toBe(true);
  await act(async () => submit());
  expect(addDoc).not.toHaveBeenCalled();
  expect(container.textContent).not.toContain("has been saved");
});
test("newsletter requires consent and only succeeds after persistence", async () => {
  addDoc.mockResolvedValue({ id: "subscription-1" });
  render(<NewsletterSignup />);
  change("newsletter-email", "alex@example.com");
  await act(async () => submit());
  expect(addDoc).not.toHaveBeenCalled();
  act(() => {
    const checkbox = container.querySelector('[type="checkbox"]');
    checkbox.checked = true;
    Simulate.change(checkbox);
  });
  await act(async () => submit());
  expect(addDoc).toHaveBeenCalledWith("newsletter", {
    email: "alex@example.com",
    consent: true,
    createdAt: "server-time",
  });
  expect(container.querySelector('[role="status"]').textContent).toContain(
    "has been saved",
  );
});
test("newsletter failure retains the email and has no success message", async () => {
  addDoc.mockRejectedValue(new Error("offline"));
  render(<NewsletterSignup />);
  change("newsletter-email", "alex@example.com");
  act(() => {
    const checkbox = container.querySelector('[type="checkbox"]');
    checkbox.checked = true;
    Simulate.change(checkbox);
  });
  await act(async () => submit());
  expect(container.querySelector('[role="alert"]').textContent).toContain(
    "couldn't save",
  );
  expect(container.querySelector("#newsletter-email").value).toBe(
    "alex@example.com",
  );
});
test("sample menu loads immediately without Firebase requests", () => {
  firebaseState.db = null;
  render(<MenuCarousel filter="all" />);
  expect(container.querySelectorAll("article")).toHaveLength(6);
  expect(getDocs).not.toHaveBeenCalled();
});
test("menu fetch failure keeps usable sample content", async () => {
  getDocs.mockRejectedValue(new Error("offline"));
  await act(async () => root.render(<MenuCarousel filter="main" />));
  expect(container.querySelectorAll("article")).toHaveLength(3);
  expect(container.textContent).toContain("temporarily unavailable");
});
test("malformed remote data safely falls back to the sample menu", async () => {
  getDocs.mockResolvedValue({
    docs: [{ id: "bad", data: () => ({ name: "Bad", category: null }) }],
  });
  await act(async () => root.render(<MenuCarousel />));
  expect(container.querySelectorAll("article")).toHaveLength(6);
});
test("failed images display accessible fallbacks and can recover with a new source", () => {
  render(<LazyImage src="/bad.jpg" alt="Garden plate" />);
  act(() => Simulate.error(container.querySelector("img")));
  expect(
    container.querySelector('[role="img"]').getAttribute("aria-label"),
  ).toBe("Garden plate");
  render(<LazyImage src="/new.jpg" alt="Garden plate" />);
  expect(container.querySelector("img").getAttribute("src")).toBe("/new.jpg");
});
test("theme works even when browser storage is blocked", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  render(
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <button onClick={toggleTheme}>{theme}</button>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>,
  );
  expect(container.textContent).toBe("light");
  act(() => Simulate.click(container.querySelector("button")));
  expect(container.textContent).toBe("dark");
  expect(document.documentElement.classList.contains("dark")).toBe(true);
});
