import React from "react";
import clsx from "clsx";
import { LoadingSpinner } from "../LoadingSpinner";
import styles from "./style.module.css";

export function LoadingModal({
  color = "black",
}: {
  color?: "black" | "white";
}) {
  return (
    <div className={styles.modal}>
      <div
        className={clsx(styles.overlay, color === "white" && styles.bgWhite)}
      />
      <div className={styles.spinner}>
        <LoadingSpinner color={color === "black" ? "white" : "black"} />
      </div>
    </div>
  );
}
