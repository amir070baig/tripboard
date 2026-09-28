import Link from "next/link";
import { TextLink } from "@/components/text-link";

export function SiteHeader() {
  return <header className="topbar"><div className="wrap nav">
    <Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link>
    <nav aria-label="Main navigation"><Link href="/experiences">Explore</Link><Link href="/bookings">My bookings</Link></nav>
    <TextLink className="nav-button" variant="outlined" href="/experiences">Find an experience <span aria-hidden="true">&#x2197;</span></TextLink>
  </div></header>;
}
