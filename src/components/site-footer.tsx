import Link from "next/link";

export function SiteFooter() {
  return <footer><div className="wrap footer">
    <Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link>
    <span>Good trips start with a little curiosity.</span>
    <Link href="/admin">TripBoard admin</Link>
  </div></footer>;
}


