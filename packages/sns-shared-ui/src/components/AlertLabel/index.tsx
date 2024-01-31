import React from "react";
import { Icon } from "../Icon";
import styles from "./style.module.css";
import { AlertText } from "../AlertText";

type Props = {
  children: React.ReactNode;
};

export function AlertLabel({ children }: Props) {
  return (
    <AlertText className={styles.label}>
      <Icon type="alert" color="orange" size="xsmall" />
      {children}
    </AlertText>
  );
}
