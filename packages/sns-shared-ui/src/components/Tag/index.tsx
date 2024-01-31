import React from "react";
import { forwardRef, type ComponentPropsWithRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithRef<"span"> & {
  size?: "xsmall" | "small" | "medium" | "large";
  color?: "black" | "gray" | "white";
};

export const Tag = forwardRef<HTMLSpanElement, Props>(function TagBase(
  { className, size = "medium", color = "white", ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={clsx(styles.tag, styles[size], styles[color], className)}
    />
  );
});
