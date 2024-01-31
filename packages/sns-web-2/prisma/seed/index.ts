import { PrismaClient } from "@prisma/client";
import { account } from "./account";
import { profile } from "./profile";
import { user } from "./user";

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  await prisma.$transaction([
    ...user(),
    ...account(),
    ...profile(),
  ]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
