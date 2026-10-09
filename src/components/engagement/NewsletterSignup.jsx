import React, { useRef, useState } from "react";
import { db } from "../../utils/firebase";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const submitting = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    setMessage("");
    if (
      !db ||
      !consent ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      email.trim().length > 254
    ) {
      setError(true);
      setMessage(
        !db
          ? "Newsletter signup is not available yet."
          : "Please enter a valid email and agree to receive updates.",
      );
      return;
    }
    submitting.current = true;
    setPending(true);
    try {
      const { addDoc, collection, serverTimestamp } =
        await import("firebase/firestore");
      await addDoc(collection(db, "newsletter"), {
        email: email.trim(),
        consent: true,
        createdAt: serverTimestamp(),
      });
      setError(false);
      setMessage(
        "Your signup request has been saved. Updates will begin when our newsletter launches.",
      );
      setEmail("");
      setConsent(false);
    } catch {
      setError(true);
      setMessage("We couldn't save your signup. Please try again.");
    } finally {
      setPending(false);
      submitting.current = false;
    }
  }

  return (
    <div className="newsletter">
      <p className="eyebrow">A little news from the kitchen</p>
      <h2>Good things, occasionally.</h2>
      <p>
        Seasonal menus, upcoming gatherings, and a reason to get together. Stay
        in the know.
      </p>
      {!db && (
        <p className="form-note">
          Newsletter signup is coming soon. We are not collecting email
          addresses yet.
        </p>
      )}
      <form
        onSubmit={submit}
        aria-label="Newsletter signup"
        aria-busy={pending}
      >
        <div className="form-field">
          <label htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            value={email}
            disabled={pending || !db}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            placeholder="you@example.com"
          />
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={consent}
            required
            disabled={pending || !db}
            onChange={(event) => {
              setConsent(event.target.checked);
              setMessage("");
            }}
          />
          <span>I agree to receive occasional Arevei updates by email.</span>
        </label>
        <button type="submit" className="button" disabled={pending || !db}>
          {pending ? "Saving…" : "Keep me in the loop ↗"}
        </button>
        {message && (
          <p
            className={`form-message ${error ? "form-error" : ""}`}
            role={error ? "alert" : "status"}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
