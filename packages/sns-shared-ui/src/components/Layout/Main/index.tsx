import React from "react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<"main">;

export const Main = forwardRef<HTMLElement, Props>(function MainBase(
  { className, ...props },
  ref,
) {
  return <main {...props} ref={ref} className={clsx(styles.main, className)} />;
});
