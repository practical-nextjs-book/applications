import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Like } from "@prisma/client";

export const like = () => {
  const res: PrismaPromise<Like>[] = [];
  fixture.forEach((data) => {
    const row = prisma.like.create({ data });
    res.push(row);
  });
  return res;
};
