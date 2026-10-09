import React, { useRef, useState } from "react";
import { db } from "../../utils/firebase";
import { localDate, timeSlots, validateBooking } from "../../utils/booking";

const initialData = {
  date: "",
  time: "",
  partySize: "2",
  name: "",
  email: "",
  specialRequests: "",
};

export default function BookingForm() {
  const [data, setData] = useState(initialData);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const submitting = useRef(false);
  const messageRef = useRef(null);
  const slots = timeSlots(data.date);

  function change(event) {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    }));
    setError("");
    setSuccess(false);
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const validation = validateBooking(data);
    if (validation || !db) {
      setError(
        validation || "Online reservation requests are currently unavailable.",
      );
      requestAnimationFrame(() => messageRef.current?.focus());
      return;
    }
    submitting.current = true;
    setPending(true);
    setError("");
    setSuccess(false);
    try {
      const { addDoc, collection, serverTimestamp } =
        await import("firebase/firestore");
      await addDoc(collection(db, "reservations"), {
        ...data,
        name: data.name.trim(),
        email: data.email.trim(),
        partySize: Number(data.partySize),
        specialRequests: data.specialRequests.trim(),
        status: "requested",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setData(initialData);
    } catch {
      setError(
        "We couldn't save your request. Your details are still here; please try again.",
      );
    } finally {
      submitting.current = false;
      setPending(false);
      requestAnimationFrame(() => messageRef.current?.focus());
    }
  }

  return (
    <section className="booking-form" aria-labelledby="booking-title">
      <h2 id="booking-title">Plan your visit.</h2>
      <p className="form-note">
        A request is not a confirmed reservation. Our team must confirm
        availability.
      </p>
      {!db && (
        <p className="form-message">
          Online reservation requests are not available yet. You can explore the
          form, but no details will be sent or saved.
        </p>
      )}
      <form
        onSubmit={submit}
        aria-label="Reservation request"
        aria-busy={pending}
      >
        <fieldset disabled={pending} className="booking-fields">
          <div className="field-grid">
            <div className="form-field">
              <label htmlFor="booking-date">Preferred date</label>
              <input
                id="booking-date"
                name="date"
                type="date"
                required
                min={localDate()}
                value={data.date}
                onChange={change}
              />
            </div>
            <div className="form-field">
              <label htmlFor="booking-time">Preferred time</label>
              <select
                id="booking-time"
                name="time"
                required
                value={data.time}
                onChange={change}
              >
                <option value="">Choose a time</option>
                {slots.map((time) => (
                  <option value={time} key={time}>
                    {new Date(`2000-01-01T${time}:00`).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="booking-party">Number of guests</label>
            <select
              id="booking-party"
              name="partySize"
              value={data.partySize}
              onChange={change}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (size) => (
                  <option key={size} value={size}>
                    {size} {size === 1 ? "guest" : "guests"}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="field-grid">
            <div className="form-field">
              <label htmlFor="booking-name">Your name</label>
              <input
                id="booking-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                value={data.name}
                onChange={change}
              />
            </div>
            <div className="form-field">
              <label htmlFor="booking-email">Email address</label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={data.email}
                onChange={change}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="booking-requests">
              Anything we should know?{" "}
              <span className="form-note">(optional)</span>
            </label>
            <textarea
              id="booking-requests"
              name="specialRequests"
              rows={3}
              maxLength={1000}
              placeholder="Dietary requirements, accessibility needs, or a special occasion"
              value={data.specialRequests}
              onChange={change}
            />
          </div>
        </fieldset>
        <p className="form-note">
          Your details are used to handle this request and contact you about it.
        </p>
        <button className="button" type="submit" disabled={pending || !db}>
          {pending ? "Sending your request…" : "Request a reservation ↗"}
        </button>
        {(error || success) && (
          <div
            ref={messageRef}
            tabIndex={-1}
            className={`form-message ${error ? "form-error" : ""}`}
            role={error ? "alert" : "status"}
          >
            {error ||
              "Your request has been saved. Your table is not confirmed yet; please wait for our team to contact you."}
          </div>
        )}
      </form>
    </section>
  );
}
