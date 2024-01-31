import React from "react";
import styles from "./style.module.css";

type Props = {
  children: React.ReactNode;
};

export function CardContainer({ children }: Props) {
  return <div className={styles.cardContainer}>{children}</div>;
}
