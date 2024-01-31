import React from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
  size?: "xsmall" | "small" | "medium" | "large";
  color?: "black" | "white";
};

export function LoadingSpinner({ size = "large", color = "black" }: Props) {
  return <div className={clsx(styles.spinner, styles[size], styles[color])} />;
}
