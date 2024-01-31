import type React from "react";
import { type ComponentPropsWithRef, createElement } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Size = "xsmall" | "small" | "medium" | "large";
type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: Size;
  children: React.ReactNode;
} & ComponentPropsWithRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Heading({
  level,
  className,
  children,
  size = "medium",
  ...props
}: Props) {
  return createElement(
    `h${level}`,
    { className: clsx(styles.title, styles[size], className), ...props },
    children,
  );
}
