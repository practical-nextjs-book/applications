"use client";

import { useId } from "react";
import Link from "next/link";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Typography } from "sns-shared-ui/src/components/Typography";
import type { Photo } from "@/services/type";
import styles from "./style.module.css";

export type PhotoViewModalContent = Photo;

type Props = PhotoViewModalContent & {
  close: () => void;
};

export function PhotoViewModal({
  id,
  title,
  description,
  imageUrl,
  close,
}: Props) {
  const modalId = useId();
  const titleId = modalId + "-title";
  const descriptionId = modalId + "-description";
  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={close} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={styles.dialog}
      >
        <div
          className={styles.photo}
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <footer className={styles.footer}>
          <Heading level={2} id={titleId} className={styles.title}>
            <Link href={`/photos/${id}`}>{title}</Link>
          </Heading>
          <Typography id={descriptionId} className={styles.description}>
            {description}
          </Typography>
        </footer>
      </div>
    </div>
  );
}
