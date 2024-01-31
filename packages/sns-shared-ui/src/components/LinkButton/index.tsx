import React from "react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  size?: "xsmall" | "small" | "medium" | "large";
  color?: "black" | "orange" | "gray" | "white";
};

export const LinkButton = forwardRef<HTMLAnchorElement, Props>(
  function LinkButtonBase(
    { className, size = "medium", color = "black", ...props },
    ref,
  ) {
    return (
      <Link
        {...props}
        ref={ref}
        className={clsx(styles.button, styles[size], styles[color], className)}
      />
    );
  },
);
