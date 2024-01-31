import React from "react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<"section">;

export const Section = forwardRef<HTMLSelectElement, Props>(function Section(
  { className, ...props },
  ref,
) {
  return (
    <section {...props} ref={ref} className={clsx(styles.section, className)} />
  );
});
