import Link from "next/link";
import type { ComponentProps } from "react";

type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: "plain" | "outlined";
};

export function TextLink({ variant = "plain", className = "", ...props }: TextLinkProps) {
  return <Link className={`text-link text-link--${variant} ${className}`.trim()} {...props} />;
}
