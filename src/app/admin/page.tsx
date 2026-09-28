import Link from "next/link";

export default function AdminPage() {
  return <main className="admin"><Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link><section className="admin-card"><span className="overline"><i /> THE BACK OFFICE</span><h1>Good trips start <em>behind the scenes.</em></h1><p>The TripBoard admin area is ready to grow. Experience and booking management will arrive in a later phase.</p><Link href="/">Return to homepage ↗</Link></section></main>;
}


