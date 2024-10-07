import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  // Clear all data from the tables
  await prisma.link.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared!");
}

async function createTags(tags) {
  const createdTags = await Promise.all(
    tags.map((tag) =>
      prisma.tag.upsert({
        where: { name: tag.name },
        update: {}, // If it exists, do nothing
        create: { name: tag.name }, // Create new tag
      })
    )
  );

  return createdTags;
}

async function loadData() {
  // Clear existing data
  await clearDatabase();

  // Create users with their links and tags
  const userData = [
    {
      email: "alice@example.com",
      name: "Alice",
      links: [
        {
          url: "https://alice-blog.com",
          description: "Alice's personal blog",
          title: "Alice Blog",
          clicks: 120,
          expiresAt: new Date("2025-12-31"),
          tags: [{ name: "Tech" }, { name: "Lifestyle" }],
        },
        {
          url: "https://alice-photography.com",
          description: "Alice's photography portfolio",
          title: "Alice Photography",
          clicks: 250,
          tags: [{ name: "Photography" }],
        },
      ],
    },
    {
      email: "bob@example.com",
      name: "Bob",
      links: [
        {
          url: "https://bob-portfolio.com",
          description: "Bob's software portfolio",
          title: "Bob Portfolio",
          clicks: 300,
          expiresAt: new Date("2024-05-01"),
          tags: [{ name: "Tech" }, { name: "Portfolio" }],
        },
        {
          url: "https://bob-travel.com",
          description: "Bob's travel blog",
          title: "Bob's Travels",
          clicks: 150,
          tags: [{ name: "Travel" }, { name: "Adventure" }],
        },
      ],
    },
    {
      email: "charlie@example.com",
      name: "Charlie",
      links: [
        {
          url: "https://charlie-recipes.com",
          description: "Charlie's recipe blog",
          title: "Charlie's Kitchen",
          clicks: 80,
          tags: [{ name: "Food" }, { name: "Cooking" }],
        },
        {
          url: "https://charlie-gardening.com",
          description: "Charlie's gardening tips",
          title: "Charlie's Garden",
          clicks: 45,
          tags: [{ name: "Gardening" }],
        },
      ],
    },
    {
      email: "dave@example.com",
      name: "Dave",
      links: [
        {
          url: "https://dave-tech.com",
          description: "Dave's tech blog",
          title: "Dave's Tech Insights",
          clicks: 230,
          tags: [{ name: "Tech" }, { name: "Gadgets" }],
        },
        {
          url: "https://dave-travel.com",
          description: "Dave's travel adventures",
          title: "Dave's Adventures",
          clicks: 60,
          tags: [{ name: "Travel" }, { name: "Photography" }],
        },
      ],
    },
  ];

  // Create tags first to ensure they exist
  for (const user of userData) {
    // Collect all tags for the current user
    const tags = user.links.flatMap((link) => link.tags);
    await createTags(tags);

    // Create or update the user with links
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {}, // No update needed; if user exists, do nothing
      create: {
        email: user.email,
        name: user.name,
        links: {
          create: user.links.map((link) => ({
            url: link.url,
            description: link.description,
            title: link.title,
            clicks: link.clicks,
            expiresAt: link.expiresAt || undefined,
            tags: {
              connect: link.tags.map((tag) => ({ name: tag.name })), // Connect existing tags
            },
          })),
        },
      },
    });

    console.log(`User: ${createdUser.name} processed.`);
  }

  console.log("Data loaded!");
}

loadData()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
