import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { ProfilePanel } from "sns-shared-ui/src/components/ProfilePanel";
import { prisma } from "@/lib/prisma";
import styles from "./style.module.css";

type Props = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export async function MyProfilePanel({ user }: Props) {
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });
  return (
    <ProfilePanel
      imageUrl={user.image}
      name={user.name || ""}
      screenName={profile.screenName || ""}
      bio={profile.bio || ""}
    >
      <div className={styles.button}>
        <LinkButton href="/profile/edit" color="white">
          プロフィールを編集する
        </LinkButton>
      </div>
    </ProfilePanel>
  );
}
