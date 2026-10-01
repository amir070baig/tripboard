import { PrismaClient } from "@prisma/client";
import { experiences } from "../src/data/experiences.ts";

const prisma = new PrismaClient();

try {
  for (const experience of experiences) {
    const data = {
      title: experience.title,
      destination: experience.destination,
      category: experience.category,
      duration: experience.duration,
      price: experience.price,
      description: experience.description,
      published: true,
    };

    await prisma.experience.upsert({
      where: { slug: experience.slug },
      create: { slug: experience.slug, ...data },
      update: data,
    });
  }
} finally {
  await prisma.$disconnect();
}
