import Link from "next/link";
import { Surface } from "@/components/surface";

type ExperienceCardProps = {
  title: string;
  place: string;
  kind: string;
  duration: string;
  price: string;
  slug: string;
  number: string;
};

export function ExperienceCard({
  title,
  place,
  kind,
  duration,
  price,
  slug,
  number,
}: ExperienceCardProps) {
  const href = "/experiences/" + slug;

  return (
    <article className="card">
      <Surface>
        <Link
          href={href}
          className={"card-art " + slug}
          aria-label={"Explore " + title}
        >
          <span>{kind}</span>
          <b>{number}</b>
          <i className="art-sun" aria-hidden="true" />
        </Link>

        <div className="place">&#x2316; &nbsp;{place}</div>

        <h3>
          <Link href={href}>{title}</Link>
        </h3>

        <div className="details">
          {duration}
          <span>&middot;</span>
          From <strong>{price}</strong> / person
        </div>
      </Surface>
    </article>
  );
}