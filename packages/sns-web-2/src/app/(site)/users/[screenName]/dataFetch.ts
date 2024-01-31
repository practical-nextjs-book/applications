import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  screenName: string;
};

export const getProfileFromScreenName = async ({ screenName }: Props) => {
  const profile = await prisma.profile.findUnique({
    where: { screenName },
    include: { user: true },
  });
  if (!profile) {
    notFound();
  }
  return profile;
};
