import type { ComponentProps, ReactNode } from "react";
import React from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
  title?: string;
  overlayProps?: ComponentProps<"div">;
  messageNode: ReactNode;
  actionsNode: ReactNode;
};

export function AlertDialogModal({
  title = "確認",
  overlayProps,
  messageNode,
  actionsNode,
}: Props) {
  return (
    <div className={styles.modal}>
      <div
        {...overlayProps}
        className={clsx(styles.overlay, overlayProps?.className)}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className={styles.dialog}
      >
        <p className={styles.message}>{messageNode}</p>
        <div className={styles.actions}>{actionsNode}</div>
      </div>
    </div>
  );
}
