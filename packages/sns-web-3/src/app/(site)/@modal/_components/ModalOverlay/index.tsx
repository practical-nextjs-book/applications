"use client";

import { useRouter } from "next/navigation";
import { useKey } from "@/app/_hooks/useKey";
import styles from "./style.module.css";

export function ModalOverlay() {
  const router = useRouter();
  // Escapeキーでモーダルを閉じる
  useKey("Escape", () => router.back());
  return (
    <div
      className={styles.overlay}
      onClick={() => {
        router.back();
      }}
    />
  );
}
