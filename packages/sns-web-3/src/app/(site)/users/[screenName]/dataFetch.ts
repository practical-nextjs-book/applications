import { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const getProfileFromScreenName = cache(async (screenName: string) => {
  const profile = await prisma.profile.findUnique({
    where: { screenName: screenName },
    include: { user: true },
  });
  if (!profile) {
    notFound();
  }
  return profile;
});
