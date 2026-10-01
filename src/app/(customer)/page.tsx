import { Button } from "@/components/button";
import { ExperienceCard } from "@/components/experience-card";
import { FormField } from "@/components/form-field";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import { categories, destinations, experiences } from "@/data/experiences";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Find thoughtful experiences shaped by the people who live there.",
  },
  {
    number: "02",
    title: "Choose",
    description: "Pick a small-group outing that fits your pace and your plans.",
  },
  {
    number: "03",
    title: "Book",
    description: "Save your place and look forward to seeing somewhere differently.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="home-title">
        <div className="wrap hero-layout">
          <div className="intro">
            <div className="overline"><i aria-hidden="true" /> SMALL GROUPS. BIG STORIES.</div>
            <h1 id="home-title">The best trips<br />feel like <em>yours.</em></h1>
            <p>Find small-group experiences led by people who know the places best.</p>
            <form className="search" action="/experiences" role="search" aria-label="Search experiences">
              <FormField
                name="q"
                label="Search experiences by destination"
                placeholder="Where do you want to go?"
                leadingMark="⌕"
                type="search"
              />
              <Button type="submit">Explore experiences <span aria-hidden="true">→</span></Button>
            </form>
            <div className="note">
              <span className="dots" aria-hidden="true"><i>•</i><i>•</i><i>•</i></span>
              Thoughtful trips, made by locals
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-top"><span>FIELD NOTES / NO. 024</span><span>36° 23′ N</span></div>
            <div className="sun" />
            <div className="ridge ridge-one" />
            <div className="ridge ridge-two" />
            <div className="water" />
            <span className="stamp">TAKE<br />THE<br />SCENIC<br />ROUTE</span>
            <div className="art-caption">Somewhere<br />along the coast <b>↗</b></div>
          </div>
        </div>
        <div className="wrap hero-foot">
          <span>MADE FOR THE WAY YOU WANT TO FEEL</span>
          <span>LOCAL HOSTS · SMALL GROUPS · GOOD STORIES</span>
        </div>
      </section>

      <section className="wrap picks" aria-label="Featured experiences">
        <SectionHeading
          eyebrow="A FEW GOOD PLACES"
          title={<>Make room for <em>wonder.</em></>}
          linkHref="/experiences"
          linkText="See all experiences →"
        />
        <div className="cards">
          {experiences.slice(0, 3).map((experience, index) => (
            <ExperienceCard
              key={experience.slug}
              title={experience.title}
              place={experience.location}
              kind={experience.category.toUpperCase()}
              duration={experience.duration}
              price={`$${experience.price}`}
              slug={experience.slug}
              number={`0${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="discovery" aria-labelledby="discovery-title">
        <div className="wrap discovery-layout">
          <div>
            <div className="overline"><i aria-hidden="true" /> START SOMEWHERE</div>
            <h2 id="discovery-title">Find a place<br />to <em>begin.</em></h2>
            <p>Choose a destination or follow what you're in the mood for.</p>
          </div>
          <div className="discovery-links">
            <div className="discovery-group">
              <h3>Places to go</h3>
              <ul className="link-list">
                {destinations.map((destination) => (
                  <li key={destination}>
                    <TextLink href="/experiences">{destination}<span aria-hidden="true">↗</span></TextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="discovery-group">
              <h3>Things to do</h3>
              <ul className="link-list">
                {categories.map((category) => (
                  <li key={category}>
                    <TextLink href="/experiences">{category}<span aria-hidden="true">↗</span></TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works wrap" aria-label="How TripBoard works">
        <SectionHeading
          eyebrow="A GOOD TRIP STARTS HERE"
          title={<>Three simple steps.<br /><em>One great story.</em></>}
          linkHref="/experiences"
          linkText="Start exploring →"
        />
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.number}>
              <span className="step-number" aria-hidden="true">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="closing" aria-label="Explore TripBoard experiences">
        <div className="wrap closing-inner">
          <b aria-hidden="true">✳</b>
          <h2>Less checklist.<br /><em>More feeling.</em></h2>
          <TextLink className="closing-cta" href="/experiences">Find your next story <span aria-hidden="true">→</span></TextLink>
        </div>
      </section>
    </main>
  );
}
