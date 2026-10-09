import { vi } from "vitest";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

vi.mock("firebase/app", () => ({ initializeApp: vi.fn() }));
vi.mock("firebase/firestore", () => ({ getFirestore: vi.fn() }));
const keys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
];
beforeEach(() => {
  vi.resetModules();
  keys.forEach((key) => vi.stubEnv(key, ""));
  initializeApp.mockReturnValue({ name: "test-app" });
  getFirestore.mockReturnValue({ name: "test-db" });
});
afterEach(() => vi.unstubAllEnvs());

test("unconfigured site does not initialize Firebase", async () => {
  expect((await import("./firebase")).db).toBeNull();
  expect(initializeApp).not.toHaveBeenCalled();
  expect(getFirestore).not.toHaveBeenCalled();
});
test("complete config initializes the existing Firestore integration", async () => {
  keys.forEach((key) => vi.stubEnv(key, "configured-value"));
  expect((await import("./firebase")).db).toEqual({ name: "test-db" });
  expect(initializeApp).toHaveBeenCalledTimes(1);
  expect(getFirestore).toHaveBeenCalledWith({ name: "test-app" });
});
test("placeholder config does not attempt a connection", async () => {
  keys.forEach((key) => vi.stubEnv(key, "YOUR_PLACEHOLDER"));
  expect((await import("./firebase")).db).toBeNull();
  expect(initializeApp).not.toHaveBeenCalled();
});
