import type { ReactNode } from "react";
import { TextLink } from "@/components/text-link";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  linkHref: string;
  linkText: string;
};

export function SectionHeading({ eyebrow, title, linkHref, linkText }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <div className="overline"><i aria-hidden="true" /> {eyebrow}</div>
        <h2>{title}</h2>
      </div>
      <TextLink href={linkHref}>{linkText}</TextLink>
    </div>
  );
}
