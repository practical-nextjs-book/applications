import React, { ComponentProps } from "react";
import styles from "./style.module.css";
import { Typography } from "../Typography";
import clsx from "clsx";

type Props = ComponentProps<typeof Typography>;

export function AlertText({ children, className }: Props) {
  return (
    <Typography className={clsx(styles.text, className)}>{children}</Typography>
  );
}
