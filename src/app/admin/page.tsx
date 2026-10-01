import Link from "next/link";
import { connection } from "next/server";
import { Button } from "@/components/button";
import { updateBookingStatus } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

type AdminSearchParams = {
  notice?: string | string[];
};

const dateTime = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});
const dateOnly = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const notices: Record<string, string> = {
  "booking-updated": "Booking status updated.",
  "already-updated": "That booking has already changed and is no longer pending.",
  "update-failed": "We couldn't update that booking. Please try again.",
  "invalid-action": "That status change isn't available.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  await connection();
  const params = await searchParams;
  const requestedNotice = Array.isArray(params.notice) ? params.notice[0] : params.notice;
  const notice = requestedNotice ? notices[requestedNotice] : undefined;

  let dashboard;
  try {
    const [totalExperiences, publishedExperiences, totalBookings, pendingBookings, confirmedBookings, bookings] =
      await Promise.all([
        prisma.experience.count(),
        prisma.experience.count({ where: { published: true } }),
        prisma.booking.count(),
        prisma.booking.count({ where: { status: "PENDING" } }),
        prisma.booking.count({ where: { status: "CONFIRMED" } }),
        prisma.booking.findMany({
          take: 50,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            customerName: true,
            customerEmail: true,
            bookingDate: true,
            travelers: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            experience: { select: { title: true, destination: true } },
          },
        }),
      ]);
    dashboard = { totalExperiences, publishedExperiences, totalBookings, pendingBookings, confirmedBookings, bookings };
  } catch {
    return (
      <main className="admin admin-dashboard">
        <Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link>
        <section className="admin-card admin-load-error" role="status">
          <span className="overline"><i aria-hidden="true" /> DEMO ADMIN</span>
          <h1>Dashboard <em>unavailable.</em></h1>
          <p>We couldn't load the dashboard right now. Please try again shortly.</p>
          <Link href="/admin">Retry dashboard</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin admin-dashboard">
      <div className="admin-topline">
        <Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link>
        <Link className="admin-customer-link" href="/experiences">View customer site <span aria-hidden="true">↗</span></Link>
      </div>

      <div className="admin-dashboard-content">
        <header className="admin-dashboard-heading">
          <div className="overline"><i aria-hidden="true" /> DEMO ADMIN · PROTOTYPE</div>
          <h1>Bookings, <em>at a glance.</em></h1>
          <p>Review recent reservations and update their status. This prototype has no sign-in or access controls.</p>
        </header>

        {notice && <p className="admin-notice" role="status">{notice}</p>}

        <section className="admin-stats" aria-label="Booking and experience summary">
          <article className="admin-stat">
            <span>Experiences</span>
            <strong>{dashboard.totalExperiences}</strong>
            <small>{dashboard.publishedExperiences} published</small>
          </article>
          <article className="admin-stat">
            <span>Total bookings</span>
            <strong>{dashboard.totalBookings}</strong>
            <small>All booking statuses</small>
          </article>
          <article className="admin-stat">
            <span>Pending</span>
            <strong>{dashboard.pendingBookings}</strong>
            <small>Awaiting confirmation</small>
          </article>
          <article className="admin-stat">
            <span>Confirmed</span>
            <strong>{dashboard.confirmedBookings}</strong>
            <small>Payment not processed</small>
          </article>
        </section>

        <section className="admin-bookings" aria-labelledby="admin-bookings-title">
          <div className="admin-section-heading">
            <div>
              <span className="overline"><i aria-hidden="true" /> RECENT ACTIVITY</span>
              <h2 id="admin-bookings-title">Customer bookings</h2>
            </div>
            <span className="admin-record-count">Latest {dashboard.bookings.length} of {dashboard.totalBookings}</span>
          </div>

          {dashboard.bookings.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No bookings yet</h3>
              <p>New customer reservations will appear here.</p>
              <Link href="/experiences">Browse experiences</Link>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Booking</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Experience</th>
                    <th scope="col">Booking date</th>
                    <th scope="col">Travelers</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td data-label="Booking"><code>{booking.id}</code></td>
                      <td data-label="Customer"><span className="admin-customer-name">{booking.customerName}</span><a className="admin-customer-email" href={`mailto:${booking.customerEmail}`}>{booking.customerEmail}</a></td>
                      <td data-label="Experience"><span className="admin-experience-name">{booking.experience.title}</span><span className="admin-experience-destination">{booking.experience.destination}</span></td>
                      <td data-label="Booking date">{dateOnly.format(booking.bookingDate)}</td>
                      <td data-label="Travelers">{booking.travelers}</td>
                      <td data-label="Total">{money.format(booking.totalAmount.toNumber())}</td>
                      <td data-label="Status"><span className={`admin-status admin-status--${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                      <td data-label="Created">{dateTime.format(booking.createdAt)}</td>
                      <td data-label="Actions">
                        {booking.status === "PENDING" ? (
                          <div className="admin-booking-actions">
                            <form action={updateBookingStatus}>
                              <input type="hidden" name="bookingId" value={booking.id} />
                              <input type="hidden" name="status" value="CONFIRMED" />
                              <Button type="submit" className="admin-status-action">Confirm</Button>
                            </form>
                            <form action={updateBookingStatus}>
                              <input type="hidden" name="bookingId" value={booking.id} />
                              <input type="hidden" name="status" value="CANCELLED" />
                              <Button type="submit" variant="secondary" className="admin-status-action">Cancel</Button>
                            </form>
                          </div>
                        ) : (
                          <span className="admin-no-action">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
