import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { prisma } from "@/lib/prisma";

type CheckoutSearchParams = {
  experienceId?: string | string[];
  bookingId?: string | string[];
};

function readParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function CheckoutMessage({ title, message }: { title: string; message: string }) {
  return (
    <main className="checkout-page wrap">
      <div className="overline"><i aria-hidden="true" /> GUEST CHECKOUT</div>
      <section className="checkout-message" role="status">
        <h1>{title}</h1>
        <p>{message}</p>
        <Link className="button button--primary" href="/experiences">Explore experiences <span aria-hidden="true"> →</span></Link>
      </section>
    </main>
  );
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<CheckoutSearchParams>;
}) {
  const params = await searchParams;
  const bookingId = readParam(params.bookingId);

  if (bookingId) {
    let booking;
    try {
      booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { experience: true },
      });
    } catch {
      return <CheckoutMessage title="Confirmation unavailable" message="We couldn't load your booking. Please try again." />;
    }

    if (!booking) {
      return <CheckoutMessage title="Booking not found" message="This confirmation link may be invalid. Explore experiences to start a new booking." />;
    }

    const bookingDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(booking.bookingDate);
    const totalAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(booking.totalAmount.toNumber());

    return (
      <main className="checkout-page wrap">
        <div className="overline"><i aria-hidden="true" /> BOOKING CONFIRMATION</div>
        <section className="confirmation-card" aria-labelledby="confirmation-title">
          <span className="confirmation-mark" aria-hidden="true">✓</span>
          <h1 id="confirmation-title">Booking created <em>successfully.</em></h1>
          <p className="confirmation-payment">Payment pending. No payment has been processed.</p>
          <dl className="confirmation-details">
            <div><dt>Booking ID</dt><dd>{booking.id}</dd></div>
            <div><dt>Experience</dt><dd>{booking.experience.title}</dd></div>
            <div><dt>Destination</dt><dd>{booking.experience.destination}</dd></div>
            <div><dt>Customer</dt><dd>{booking.customerName}</dd></div>
            <div><dt>Booking date</dt><dd>{bookingDate}</dd></div>
            <div><dt>Travelers</dt><dd>{booking.travelers}</dd></div>
            <div><dt>Total amount</dt><dd>{totalAmount}</dd></div>
            <div><dt>Status</dt><dd><span className="booking-status">{booking.status}</span></dd></div>
          </dl>
          <Link className="button button--primary" href="/experiences">Keep exploring <span aria-hidden="true"> →</span></Link>
        </section>
      </main>
    );
  }

  const experienceId = readParam(params.experienceId);
  if (!experienceId) {
    return <CheckoutMessage title="Choose an experience first" message="Open an experience and choose Book now to begin checkout." />;
  }

  let experience;
  try {
    experience = await prisma.experience.findFirst({
      where: { id: experienceId, published: true },
      select: { id: true, title: true, destination: true, price: true },
    });
  } catch {
    return <CheckoutMessage title="Checkout unavailable" message="We couldn't load this experience. Please try again." />;
  }

  if (!experience) {
    return <CheckoutMessage title="Experience unavailable" message="This experience is no longer available. Explore current experiences to choose another." />;
  }

  return (
    <main className="checkout-page wrap">
      <header className="checkout-heading">
        <div className="overline"><i aria-hidden="true" /> GUEST CHECKOUT</div>
        <h1>Your next trip, <em>one step closer.</em></h1>
        <p>Reserve your place with a local host. Payment is not part of this demo.</p>
      </header>
      <BookingForm
        experienceId={experience.id}
        title={experience.title}
        destination={experience.destination}
        price={experience.price.toNumber()}
        minBookingDate={new Date().toISOString().slice(0, 10)}
      />
    </main>
  );
}
