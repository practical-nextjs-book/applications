import React from "react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  size?: "small" | "medium" | "large";
  icon?: "plus";
  color?: "black" | "orange";
};

export const ButtonCircle = forwardRef<HTMLButtonElement, Props>(
  function ButtonCircleBase(
    { className, size = "medium", icon = "plus", color = "black", ...props },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(
          styles.button,
          styles[size],
          styles[icon],
          styles[color],
          className,
        )}
      />
    );
  },
);
