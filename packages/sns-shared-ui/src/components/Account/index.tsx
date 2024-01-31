import React from "react";
import { Avatar } from "../Avatar";
import styles from "./style.module.css";

type Props = {
  name?: string | null;
  imageUrl?: string | null;
  screenName?: string | null;
  avatarSize?: "small" | "medium" | "large";
};

export function Account({
  name,
  imageUrl,
  screenName,
  avatarSize = "medium",
}: Props) {
  return (
    <div className={styles.account}>
      <Avatar size={avatarSize} avatarImageUrl={imageUrl} />
      <div className={styles.info}>
        {name && <p className={styles.name}>{name}</p>}
        {screenName && <p className={styles.screenName}>@{screenName}</p>}
      </div>
    </div>
  );
}
