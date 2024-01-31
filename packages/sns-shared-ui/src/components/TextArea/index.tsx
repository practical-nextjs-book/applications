import React from "react";
import { forwardRef, type ComponentPropsWithRef } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithRef<"textarea"> & {
  resize?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  function TextAreaBase({ className, resize = false, ...props }, ref) {
    return (
      <textarea
        {...props}
        ref={ref}
        className={clsx(styles.textarea, resize && styles.resize, className)}
      />
    );
  },
);
