"use client";

import type { ReactNode } from "react";
import { ModalContainer } from "@/app/_components/ModalContainer";
import { PhotoCreateModal } from "@/app/_components/PhotoCreateModal";
import type { GetCategoriesResponse } from "@/services/getCategories";
import { PhotoCreateForm } from "../PhotoCreateForm";

type Props = {
  children: ReactNode;
  toggleClassName?: string;
} & GetCategoriesResponse;

export function PhotoCreateModalContainer({
  categories,
  children,
  toggleClassName,
}: Props) {
  return (
    <ModalContainer
      toggleClassName={toggleClassName}
      content={(closeModal) => (
        <PhotoCreateModal close={closeModal}>
          <PhotoCreateForm categories={categories} />
        </PhotoCreateModal>
      )}
    >
      {children}
    </ModalContainer>
  );
}
