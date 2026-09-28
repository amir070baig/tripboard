import Link from "next/link";
import { ExperienceCard } from "@/components/experience-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
          <form className="search" action="/experiences"><label htmlFor="destination">?</label><input id="destination" name="q" placeholder="Where do you want to go?" /><button>Explore trips <span>-&gt;</span></button></form>
          <div className="note"><span className="dots"><i>*</i><i>-&gt;</i><i>o</i></span> Thoughtful trips, made by locals</div>
        </div>
        <div className="hero-art" role="img" aria-label="Illustration of a sun setting over a coastal landscape">
          <div className="art-top"><span>FIELD NOTES / NO. 024</span><span>36 deg  23 N</span></div><div className="sun" /><div className="ridge ridge-one" /><div className="ridge ridge-two" /><div className="water" />
          <span className="stamp">TAKE<br />THE<br />SCENIC<br />ROUTE</span><div className="art-caption">Somewhere<br />along the coast <b>-&gt;</b></div>
        </div>
      </div><div className="wrap hero-foot"><span>MADE FOR THE WAY YOU WANT TO FEEL</span><span>01 - 03 / CURATED EXPERIENCES</span></div></section>
      <section className="wrap picks"><div className="section-heading"><div><div className="overline"><i /> A FEW GOOD PLACES</div><h2>Make room for <em>wonder.</em></h2></div><Link href="/experiences">See all experiences -&gt;</Link></div>
        <div className="cards">{trips.map((trip, index) => <ExperienceCard key={trip.title} title={trip.title} place={trip.place} kind={trip.kind} duration={trip.time} price={trip.price} slug={trip.art} number={"0" + (index + 1)} />)}</div>
      </section>
      <section className="closing"><div className="wrap closing-inner"><b>*</b><p>Less checklist.<br /><em>More feeling.</em></p><Link href="/experiences">Find your next story -&gt;</Link></div></section>
    </main><SiteFooter /></>
  );
}
