import React from "react";
import { forwardRef, type ComponentPropsWithRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithRef<"input">;

export const TextField = forwardRef<HTMLInputElement, Props>(
  function TextFieldBase({ className, ...props }, ref) {
    return (
      <input
        type="text"
        {...props}
        ref={ref}
        className={clsx(styles.textfield, className)}
      />
    );
  },
);
