import Link from "next/link";

export function SiteHeader() {
  return <header className="topbar"><div className="wrap nav">
    <Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link>
    <nav aria-label="Main navigation"><Link href="/experiences">Explore</Link><Link href="/bookings">My bookings</Link></nav>
    <Link className="nav-button" href="/experiences">Find an experience <span>&#x2197;</span></Link>
  </div></header>;
}


