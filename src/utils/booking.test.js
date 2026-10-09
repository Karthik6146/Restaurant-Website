import { localDate, timeSlots, validateBooking } from "./booking";

const now = new Date(2026, 9, 9, 16, 0);
const valid = {
  date: "2026-10-10",
  time: "18:00",
  partySize: "2",
  name: "Alex",
  email: "alex@example.com",
  specialRequests: "",
};

test("uses the local calendar date without a UTC conversion", () => {
  expect(localDate(new Date(2026, 9, 9, 0, 1))).toBe("2026-10-09");
});
test("accepts a future request and rejects past dates and past same-day times", () => {
  expect(validateBooking(valid, now)).toBe("");
  expect(validateBooking({ ...valid, date: "2026-10-08" }, now)).toMatch(
    /future/,
  );
  expect(
    validateBooking({ ...valid, date: "2026-10-09", time: "15:00" }, now),
  ).toMatch(/future/);
});
test("rejects malformed dates, impossible dates and times outside service hours", () => {
  expect(validateBooking({ ...valid, date: "2026-02-30" }, now)).toBeTruthy();
  expect(validateBooking({ ...valid, date: "nonsense" }, now)).toBeTruthy();
  expect(validateBooking({ ...valid, time: "03:00" }, now)).toMatch(/service/);
});
test("bounds party size and requires a name and valid email", () => {
  for (const partySize of ["0", "11", "2.5", "bad"])
    expect(validateBooking({ ...valid, partySize }, now)).toMatch(/guests/);
  expect(validateBooking({ ...valid, name: "  " }, now)).toMatch(/name/);
  expect(validateBooking({ ...valid, email: "invalid" }, now)).toMatch(/email/);
  expect(
    validateBooking({ ...valid, specialRequests: "x".repeat(1001) }, now),
  ).toMatch(/1,000/);
});
test("offers half-hour slots with ninety minutes before closing and filters elapsed slots", () => {
  expect(timeSlots("2026-10-11", now)[0]).toBe("10:00");
  expect(timeSlots("2026-10-11", now).at(-1)).toBe("19:30");
  expect(timeSlots("2026-10-10", now).at(-1)).toBe("21:30");
  expect(timeSlots("2026-10-09", now)[0]).toBe("16:30");
});
