import React from "react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<"select">;

export const Select = forwardRef<HTMLSelectElement, Props>(function SelectBase(
  { className, ...props },
  ref,
) {
  return (
    <span className={clsx(styles.select, className)}>
      <select {...props} ref={ref} />
    </span>
  );
});
