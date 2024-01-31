import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Icon } from "../Icon";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<"button"> & {
  count: number;
  size?: "xsmall" | "small";
  color?: "orange";
  isSubmitting?: boolean;
};

export const LikeButton = forwardRef<HTMLButtonElement, Props>(
  function LikeButtonBase(
    {
      count,
      size = "small",
      color = "orange",
      className,
      disabled,
      isSubmitting,
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        className={clsx(
          styles.button,
          styles[size],
          isSubmitting && styles.isSubmitting,
          className,
        )}
      >
        {isSubmitting ? "…" : count}
        <Icon
          type={disabled ? "heart" : "heart-border"}
          color={isSubmitting ? "gray" : color}
          size={size}
        />
      </button>
    );
  },
);
