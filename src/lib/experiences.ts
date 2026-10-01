import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type ExperienceSort = "recommended" | "price-asc" | "price-desc";
export type ExperiencePriceRange = "" | "under-75" | "75-150" | "150-plus";

export type ExperienceFilters = {
  query: string;
  destination: string;
  category: string;
  duration: string;
  price: ExperiencePriceRange;
  sort: ExperienceSort;
};

export async function getPublishedExperienceOptions() {
  const experiences = await prisma.experience.findMany({
    where: { published: true },
    select: { destination: true, category: true, duration: true },
    orderBy: { createdAt: "asc" },
  });

  return {
    destinations: [...new Set(experiences.map(({ destination }) => destination))],
    categories: [...new Set(experiences.map(({ category }) => category))],
    durations: [...new Set(experiences.map(({ duration }) => duration))],
  };
}

export async function getPublishedExperiences(filters: ExperienceFilters) {
  const where: Prisma.ExperienceWhereInput = { published: true };

  if (filters.query) {
    const search = { contains: filters.query, mode: "insensitive" as const };
    where.OR = [
      { title: search },
      { destination: search },
      { category: search },
      { duration: search },
      { description: search },
    ];
  }

  if (filters.destination) where.destination = filters.destination;
  if (filters.category) where.category = filters.category;
  if (filters.duration) where.duration = filters.duration;

  if (filters.price === "under-75") where.price = { lt: 75 };
  if (filters.price === "75-150") where.price = { gte: 75, lte: 150 };
  if (filters.price === "150-plus") where.price = { gt: 150 };

  const orderBy: Prisma.ExperienceOrderByWithRelationInput[] =
    filters.sort === "price-asc"
      ? [{ price: "asc" }, { createdAt: "asc" }]
      : filters.sort === "price-desc"
        ? [{ price: "desc" }, { createdAt: "asc" }]
        : [{ createdAt: "asc" }];

  return prisma.experience.findMany({ where, orderBy });
}

export function getPublishedExperienceBySlug(slug: string) {
  return prisma.experience.findFirst({
    where: { slug, published: true },
  });
}
