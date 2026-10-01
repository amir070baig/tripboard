"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/button";
import { createBooking, type BookingActionState } from "@/app/(customer)/checkout/actions";

type BookingFormProps = {
  experienceId: string;
  title: string;
  destination: string;
  price: number;
  minBookingDate: string;
};

const initialState: BookingActionState = {};
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function BookingForm({
  experienceId,
  title,
  destination,
  price,
  minBookingDate,
}: BookingFormProps) {
  const [state, action, pending] = useActionState(createBooking, initialState);
  const [travelersValue, setTravelersValue] = useState("1");
  const travelers = Number(travelersValue);
  const total = Number.isSafeInteger(travelers) && travelers > 0 && travelers <= 10
    ? price * travelers
    : 0;

  return (
    <div className="checkout-layout">
      <section className="checkout-panel" aria-labelledby="booking-form-title">
        <div className="overline"><i aria-hidden="true" /> GUEST CHECKOUT</div>
        <h2 id="booking-form-title">Your details</h2>
        <p className="checkout-lede">A few details are all we need to save your place.</p>

        <form action={action} className="checkout-form">
          <input type="hidden" name="experienceId" value={experienceId} />

          {state.error && <p className="checkout-error" role="alert">{state.error}</p>}

          <label className="checkout-field">
            <span>Full name</span>
            <input name="customerName" type="text" autoComplete="name" maxLength={120} required />
          </label>
          <label className="checkout-field">
            <span>Email address</span>
            <input name="customerEmail" type="email" autoComplete="email" maxLength={254} required />
          </label>
          <div className="checkout-form-row">
            <label className="checkout-field">
              <span>Booking date</span>
              <input name="bookingDate" type="date" min={minBookingDate} required />
            </label>
            <label className="checkout-field">
              <span>Travelers</span>
              <input
                name="travelers"
                type="number"
                min={1}
                max={10}
                step={1}
                value={travelersValue}
                onChange={(event) => setTravelersValue(event.target.value)}
                required
              />
            </label>
          </div>

          <div className="checkout-total" aria-live="polite">
            <span>Total for {travelersValue || 0} {travelers === 1 ? "traveler" : "travelers"}</span>
            <strong>{currency.format(total)}</strong>
          </div>
          <Button type="submit" disabled={pending} className="checkout-submit">
            {pending ? "Creating booking…" : "Create booking"}
            {!pending && <span aria-hidden="true"> →</span>}
          </Button>
          <p className="checkout-payment-note">No payment is collected. Payment is not implemented in this demo.</p>
        </form>
      </section>

      <aside className="checkout-summary" aria-label="Experience summary">
        <span className="overline"><i aria-hidden="true" /> YOUR EXPERIENCE</span>
        <h2>{title}</h2>
        <p>{destination}</p>
        <dl>
          <div><dt>Price per traveler</dt><dd>{currency.format(price)}</dd></div>
          <div><dt>Travelers</dt><dd>{travelersValue || 0}</dd></div>
          <div className="checkout-summary-total"><dt>Booking total</dt><dd>{currency.format(total)}</dd></div>
        </dl>
        <p className="checkout-payment-note">Your booking will be created with payment pending.</p>
      </aside>
    </div>
  );
}
