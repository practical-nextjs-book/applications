import React from "react";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";
import { Icon } from "../Icon";
import { TextField } from "../TextField";
import styles from "./style.module.css";

type Props = {
  inputProps: ComponentProps<typeof TextField>;
  buttonProps?: ComponentPropsWithoutRef<"button">;
};

export function CommentBox({ inputProps, buttonProps }: Props) {
  return (
    <div className={styles.commentBox}>
      <TextField {...inputProps} />
      <button aria-label="コメントを投稿する" type="submit" {...buttonProps}>
        <Icon type="paper-plane" color="orange" />
      </button>
    </div>
  );
}
