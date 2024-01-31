"use client";

import { useState, useCallback } from "react";
import { useKey } from "./useKey";

export function useModal(defaultOpen: boolean = false) {
  const [state, setState] = useState<{
    isOpen: boolean;
  }>({ isOpen: defaultOpen });

  const closeModal = useCallback(() => {
    setState(() => ({ isOpen: false }));
  }, []);
  const openModal = useCallback(() => {
    setState({ isOpen: true });
  }, []);

  // Escapeキーでモーダルを閉じる
  useKey("Escape", closeModal);

  return { openModal, closeModal, isOpen: state.isOpen };
}
