export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) || localDate(parsed) !== value
    ? null
    : parsed;
}

// shortcut: sample hours use the guest's timezone; use the venue timezone when its location is verified.
export function timeSlots(date, now = new Date()) {
  const parsed = parseDate(date);
  if (!parsed) return [];
  const day = parsed.getDay();
  const opening = day === 0 ? 10 : 11;
  const closing = day === 0 ? 21 : day === 5 || day === 6 ? 23 : 22;
  const slots = [];
  for (let minute = opening * 60; minute <= closing * 60 - 90; minute += 30) {
    const time = `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
    if (new Date(`${date}T${time}:00`) > now) slots.push(time);
  }
  return slots;
}

export function validateBooking(data, now = new Date()) {
  if (!parseDate(data.date)) return "Please choose a valid date.";
  const selected = new Date(`${data.date}T${data.time}:00`);
  if (Number.isNaN(selected.getTime()) || selected <= now)
    return "Please choose a future date and time.";
  if (!timeSlots(data.date, now).includes(data.time))
    return "Please choose a time within our sample service hours.";
  const guests = Number(data.partySize);
  if (!Number.isInteger(guests) || guests < 1 || guests > 10)
    return "Please choose between 1 and 10 guests.";
  if (!data.name.trim() || data.name.trim().length > 100)
    return "Please enter your name (up to 100 characters).";
  if (
    data.email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  )
    return "Please enter a valid email address.";
  if (data.specialRequests.length > 1000)
    return "Please keep special requests within 1,000 characters.";
  return "";
}
