import { prisma } from "..";
import fixture from "./fixture.json";
import type { PrismaPromise, Photo } from "@prisma/client";

export const photo = () => {
  const res: PrismaPromise<Photo>[] = [];
  fixture.forEach((data) => {
    Array.from({ length: 1 }, (_, i) => {
      const row = prisma.photo.create({
        data: { ...data, id: `${data.id}${i}` },
      });
      res.push(row);
    });
  });
  return res;
};
