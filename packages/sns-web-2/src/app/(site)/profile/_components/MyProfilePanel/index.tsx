"use client";
// ❌: 不要な use client
import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { ProfilePanel } from "sns-shared-ui/src/components/ProfilePanel";
import styles from "./style.module.css";

type Props = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  profile: {
    id: string;
    bio: string | null;
    screenName: string | null;
    userId: string;
  };
};

export function MyProfilePanel({ user, profile }: Props) {
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
