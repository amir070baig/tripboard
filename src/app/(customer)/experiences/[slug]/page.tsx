import Link from "next/link";

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main className="placeholder"><span className="overline"><i /> EXPERIENCE PREVIEW</span><h1>A story called <em>{slug.replaceAll("-", " ")}.</em></h1><p>Experience details and availability will be added in a later phase.</p><Link className="action" href="/experiences">Browse experiences ↗</Link></main>;
}


