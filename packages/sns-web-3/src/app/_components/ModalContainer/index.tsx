"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { useModal } from "@/app/_hooks/useModal";
import styles from "./style.module.css";

export function ModalContainer({
  children,
  content,
  defaultOpen = false,
  toggleClassName,
}: {
  children: ReactNode;
  content: (closeModal: () => void) => ReactNode;
  defaultOpen?: boolean;
  toggleClassName?: string;
}) {
  const { openModal, closeModal, isOpen } = useModal(defaultOpen);
  return (
    <>
      <button
        onClick={openModal}
        className={clsx(styles.toggle, toggleClassName)}
      >
        {children}
      </button>
      {isOpen && content(closeModal)}
    </>
  );
}
