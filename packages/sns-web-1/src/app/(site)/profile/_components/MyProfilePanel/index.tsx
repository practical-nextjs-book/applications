"use client";

import { LinkButton } from "sns-shared-ui/src/components/LinkButton";
import { ProfilePanel } from "sns-shared-ui/src/components/ProfilePanel";
import type { Profile, User } from "@/services/type";
import styles from "./style.module.css";

type Props = {
  user: User;
  profile: Profile | null;
};

export function MyProfilePanel({ user, profile }: Props) {
  return (
    <ProfilePanel
      imageUrl={user.image}
      name={user.name || ""}
      screenName={profile?.screenName || ""}
      bio={profile?.bio || ""}
    >
      <div className={styles.button}>
        <LinkButton href="/profile/edit" color="white">
          プロフィールを編集する
        </LinkButton>
      </div>
    </ProfilePanel>
  );
}
