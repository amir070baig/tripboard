import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedExperienceBySlug } from "@/lib/experiences";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getPublishedExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const price = experience.price.toNumber();
  const facts = [
    { label: "Duration", value: experience.duration },
    { label: "Destination", value: experience.destination },
    { label: "Starting price", value: `$${price} per person` },
  ];

  return (
    <main className="detail-page wrap">
      <nav className="detail-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/experiences">Explore</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{experience.destination}</li>
        </ol>
      </nav>

      <header className="detail-header">
        <span className="detail-category">{experience.category}</span>
        <h1>{experience.title}</h1>
        <div className="detail-header-meta">
          <p className="detail-location"><span aria-hidden="true">⌖</span> {experience.destination}</p>
        </div>
        <dl className="detail-meta">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="detail-gallery" aria-hidden="true">
        <div className="detail-gallery__frame" aria-hidden="true">
          <div className={`card-art ${experience.slug} detail-gallery__art`}>
            <span>{experience.category.toUpperCase()}</span>
            <b>01</b>
            <i className="art-sun" />
          </div>
        </div>
      </div>

      <div className="detail-layout">
        <article className="detail-content">
          <section className="detail-section detail-intro" aria-labelledby="about-title">
            <h2 id="about-title">A little about this experience</h2>
            <p>{experience.description}</p>
          </section>
        </article>

        <aside className="detail-sidebar" aria-label="Experience booking information">
          <section className="detail-booking-card" aria-labelledby="booking-title">
            <p className="detail-booking-eyebrow">A GOOD DAY, WELL SPENT</p>
            <h2 id="booking-title">Make it part of your trip.</h2>
            <p className="detail-price"><strong>${price}</strong> <span>per person</span></p>
            <dl className="detail-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <Link className="button button--primary detail-booking-button" href={`/checkout?experienceId=${encodeURIComponent(experience.id)}`}>
              Book now <span aria-hidden="true">→</span>
            </Link>
            <p className="detail-booking-note">A local experience to look forward to.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
