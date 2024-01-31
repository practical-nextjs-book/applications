import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Comment } from "@prisma/client";

export const comment = () => {
  const res: PrismaPromise<Comment>[] = [];
  fixture.forEach((data) => {
    const row = prisma.comment.create({ data });
    res.push(row);
  });
  return res;
};
