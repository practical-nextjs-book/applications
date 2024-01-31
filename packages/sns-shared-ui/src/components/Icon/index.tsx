import React from "react";
import clsx from "clsx";
import styles from "./style.module.css";

export type Props = {
  type:
    | "account"
    | "alert"
    | "camera"
    | "comments"
    | "gear"
    | "heart-border"
    | "heart"
    | "home"
    | "paper-plane"
    | "photos"
    | "trash-box"
    | "upload"
    | "user"
    | "zoom";
  size?: "xsmall" | "small" | "medium" | "large";
  color?: "black" | "gray" | "orange" | "white";
  className?: string;
};

export function Icon({
  type,
  size = "small",
  color = "black",
  className,
}: Props) {
  return (
    <span
      className={clsx(
        styles.icon,
        styles[type],
        styles[size],
        styles[color],
        className,
      )}
    />
  );
}
