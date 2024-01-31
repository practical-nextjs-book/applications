import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<"button"> & {
  size?: "xsmall" | "small" | "medium" | "large";
  color?: "black" | "orange" | "gray" | "white";
};

export const Button = forwardRef<HTMLButtonElement, Props>(function ButtonBase(
  { className, size = "medium", color = "black", ...props },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(styles.button, styles[size], styles[color], className)}
    />
  );
});
