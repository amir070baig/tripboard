import Link from "next/link";
import { TextLink } from "@/components/text-link";

export function SiteFooter() {
  return <footer><div className="wrap footer">
    <Link className="brand" href="/"><span className="brand-icon">t</span>tripboard</Link>
    <span>Good trips start with a little curiosity.</span>
    <TextLink href="/admin">TripBoard admin</TextLink>
  </div></footer>;
}


