import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Category } from "@prisma/client";

export const category = () => {
  const res: PrismaPromise<Category>[] = [];
  fixture.forEach((data) => {
    const row = prisma.category.create({ data });
    res.push(row);
  });
  return res;
};
