import React from "react";
import type { ComponentPropsWithoutRef } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<typeof LoadingSpinner>;

export function LoadingModule(props: Props) {
  return (
    <div className={styles.module}>
      <LoadingSpinner {...props} />
    </div>
  );
}
