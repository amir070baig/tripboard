import Link from "next/link";
import { Button } from "@/components/button";
import { ExperienceCard } from "@/components/experience-card";
import { FormField } from "@/components/form-field";
import {
  getPublishedExperiences,
  getPublishedExperienceOptions,
  type ExperiencePriceRange,
  type ExperienceSort,
} from "@/lib/experiences";

type ExploreSearchParams = {
  q?: string | string[];
  destination?: string | string[];
  category?: string | string[];
  duration?: string | string[];
  price?: string | string[];
  sort?: string | string[];
};

const sortOptions: readonly ExperienceSort[] = ["recommended", "price-asc", "price-desc"];
const priceOptions: readonly ExperiencePriceRange[] = ["under-75", "75-150", "150-plus"];

function readParam(value: string | string[] | undefined) {
  const param = Array.isArray(value) ? value[0] : value;
  return param?.trim() ?? "";
}

function findOption<T extends string>(options: readonly T[], value: string) {
  return options.find((option) => option.toLowerCase() === value.toLowerCase()) ?? "";
}

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<ExploreSearchParams>;
}) {
  const params = await searchParams;
  const { destinations, categories, durations } = await getPublishedExperienceOptions();
  const query = readParam(params.q);
  const destination = findOption(destinations, readParam(params.destination));
  const category = findOption(categories, readParam(params.category));
  const duration = findOption(durations, readParam(params.duration));
  const requestedPrice = readParam(params.price);
  const price = priceOptions.find((option) => option === requestedPrice) ?? "";
  const requestedSort = readParam(params.sort);
  const sort = sortOptions.find((option) => option === requestedSort) ?? "recommended";
  const results = await getPublishedExperiences({
    query,
    destination,
    category,
    duration,
    price,
    sort,
  });

  return (
    <main className="explore-page wrap">
      <header className="explore-heading">
        <div className="overline"><i aria-hidden="true" /> TRIPBOARD EXPERIENCES</div>
        <h1>Find your <em>somewhere.</em></h1>
        <p>Small-group experiences, hosted by people who know their place by heart.</p>
      </header>

      <section className="explore-panel" aria-label="Search and filter experiences">
        <form action="/experiences" method="get" className="explore-form" role="search">
          <div className="explore-search-row">
            <FormField
              name="q"
              label="Search experiences by name, destination, or activity"
              placeholder="Try Lisbon, kayaking, or local food"
              leadingMark="⌕"
              type="search"
              defaultValue={query}
            />
            <Button type="submit">Search <span aria-hidden="true">→</span></Button>
          </div>

          <div className="explore-filter-row">
            <div className="explore-select">
              <label htmlFor="destination">Destination</label>
              <select id="destination" name="destination" defaultValue={destination}>
                <option value="">Any destination</option>
                {destinations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="explore-select">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" defaultValue={category}>
                <option value="">Any category</option>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="explore-select">
              <label htmlFor="duration">Duration</label>
              <select id="duration" name="duration" defaultValue={duration}>
                <option value="">Any duration</option>
                {durations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="explore-select">
              <label htmlFor="price">Price</label>
              <select id="price" name="price" defaultValue={price}>
                <option value="">Any price</option>
                <option value="under-75">Under $75</option>
                <option value="75-150">$75–$150</option>
                <option value="150-plus">Over $150</option>
              </select>
            </div>
            <div className="explore-select explore-sort">
              <label htmlFor="sort">Sort by</label>
              <select id="sort" name="sort" defaultValue={sort}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>
          <div className="explore-form-footer">
            <Button type="submit" variant="secondary">Update results</Button>
            <Link className="text-link" href="/experiences">Clear all</Link>
          </div>
        </form>
      </section>

      <section className="explore-results" aria-labelledby="results-title">
        <div className="results-heading">
          <div>
            <h2 id="results-title">Experiences to remember</h2>
            <p aria-live="polite">{results.length} {results.length === 1 ? "experience" : "experiences"} found</p>
          </div>
          {query && <p className="results-query">Results for “{query}”</p>}
        </div>

        {results.length > 0 ? (
          <div className="cards">
            {results.map((experience, index) => (
              <ExperienceCard
                key={experience.slug}
                title={experience.title}
                place={experience.destination}
                kind={experience.category.toUpperCase()}
                duration={experience.duration}
                price={`$${experience.price.toNumber()}`}
                slug={experience.slug}
                number={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span className="overline"><i aria-hidden="true" /> NO MATCHES JUST YET</span>
            <h3>Try a different search.</h3>
            <p>Adjust a filter or search for another place, activity, or kind of experience.</p>
            <Link className="action" href="/experiences">Clear search and filters <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>
    </main>
  );
}
