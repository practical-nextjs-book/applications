import React from "react";
import styles from "./style.module.css";

type Props = {
  children: React.ReactNode;
};

export function HeadGroup({ children }: Props) {
  return <header className={styles.headGroup}>{children}</header>;
}
