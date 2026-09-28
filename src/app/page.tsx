import { ExperienceCard } from "@/components/experience-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { SectionHeading } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";

const trips = [
  { place: "Lisbon, Portugal", title: "A slower side of Lisbon", kind: "CITY & CULTURE", time: "3 hours", price: "$48", art: "lisbon" },
  { place: "Amalfi Coast, Italy", title: "Coastline by kayak", kind: "ON THE WATER", time: "Half day", price: "$72", art: "amalfi" },
  { place: "Cusco, Peru", title: "Trails above the clouds", kind: "OUTDOORS", time: "2 days", price: "$185", art: "cusco" },
];

export default function Home() {
  return (
    <><SiteHeader /><main>
      <section className="hero"><div className="wrap hero-layout">
        <div className="intro"><div className="overline"><i /> SMALL GROUPS. BIG STORIES.</div>
          <h1>Go beyond<br />the <em>usual.</em></h1>
          <p>Find the people, places, and little moments that make a trip yours.</p>
          <form className="search" action="/experiences"><FormField name="q" label="Where do you want to go?" placeholder="Where do you want to go?" leadingMark="⌕" /><Button type="submit">Explore trips <span aria-hidden="true">-&gt;</span></Button></form>
          <div className="note"><span className="dots" aria-hidden="true"><i>*</i><i>-&gt;</i><i>o</i></span> Thoughtful trips, made by locals</div>
        </div>
        <div className="hero-art" role="img" aria-label="Illustration of a sun setting over a coastal landscape">
          <div className="art-top" aria-hidden="true"><span>FIELD NOTES / NO. 024</span><span>36 deg  23 N</span></div><div className="sun" aria-hidden="true" /><div className="ridge ridge-one" aria-hidden="true" /><div className="ridge ridge-two" aria-hidden="true" /><div className="water" aria-hidden="true" />
          <span className="stamp" aria-hidden="true">TAKE<br />THE<br />SCENIC<br />ROUTE</span><div className="art-caption" aria-hidden="true">Somewhere<br />along the coast <b>-&gt;</b></div>
        </div>
      </div><div className="wrap hero-foot"><span>MADE FOR THE WAY YOU WANT TO FEEL</span><span>01 - 03 / CURATED EXPERIENCES</span></div></section>
      <section className="wrap picks"><SectionHeading eyebrow="A FEW GOOD PLACES" title={<>Make room for <em>wonder.</em></>} linkHref="/experiences" linkText="See all experiences -&gt;" />
        <div className="cards">{trips.map((trip, index) => <ExperienceCard key={trip.title} title={trip.title} place={trip.place} kind={trip.kind} duration={trip.time} price={trip.price} slug={trip.art} number={"0" + (index + 1)} />)}</div>
      </section>
      <section className="closing"><div className="wrap closing-inner"><b aria-hidden="true">*</b><p>Less checklist.<br /><em>More feeling.</em></p><TextLink href="/experiences">Find your next story -&gt;</TextLink></div></section>
    </main><SiteFooter /></>
  );
}
