import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Account } from "@prisma/client";

export const account = () => {
  const res: PrismaPromise<Account>[] = [];
  fixture.forEach((data) => {
    const row = prisma.account.create({ data });
    res.push(row);
  });
  return res;
};
