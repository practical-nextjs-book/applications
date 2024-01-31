import React from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
  size?: "small" | "medium" | "large";
  avatarImageUrl?: string | null;
};

export function Avatar({ size = "medium", avatarImageUrl }: Props) {
  return (
    <span
      className={clsx(styles.avatar, styles[size])}
      {...(avatarImageUrl && {
        style: { backgroundImage: `url(${avatarImageUrl})` },
      })}
    />
  );
}
