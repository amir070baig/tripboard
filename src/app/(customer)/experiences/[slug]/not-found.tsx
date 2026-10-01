import Link from "next/link";

export default function ExperienceNotFound() {
  return (
    <main className="detail-not-found wrap">
      <div className="overline"><i aria-hidden="true" /> EXPERIENCE NOT FOUND</div>
      <h1>That experience took a <em>different path.</em></h1>
      <p>It may have moved on. Explore the experiences currently on TripBoard to find another good story.</p>
      <Link className="button button--primary" href="/experiences">Browse experiences <span aria-hidden="true">→</span></Link>
    </main>
  );
}
