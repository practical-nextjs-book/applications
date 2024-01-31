import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Profile } from "@prisma/client";

export const profile = () => {
  const res: PrismaPromise<Profile>[] = [];
  fixture.forEach((data) => {
    const row = prisma.profile.create({ data });
    res.push(row);
  });
  return res;
};
