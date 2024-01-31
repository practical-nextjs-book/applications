import { prisma } from "@/lib/prisma";
import { MyProfileEditForm } from "./MyProfileEditForm";

type Props = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export async function MyProfileEditPanel({ user }: Props) {
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });
  return <MyProfileEditForm user={user} profile={profile} />;
}
