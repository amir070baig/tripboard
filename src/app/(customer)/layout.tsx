import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <div className="customer-layout"><SiteHeader />{children}<SiteFooter /></div>;
}


