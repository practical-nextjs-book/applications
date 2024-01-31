"use client";

import type { ReactNode } from "react";
import type { Photo } from "@/services/type";
import { ModalContainer } from "../ModalContainer";
import { PhotoViewModal } from "../PhotoViewModal";

export function PhotoViewModalContainer({
  photo,
  children,
}: {
  photo: Photo;
  children: ReactNode;
}) {
  return (
    <ModalContainer
      content={(closeModal) => <PhotoViewModal {...photo} close={closeModal} />}
    >
      {children}
    </ModalContainer>
  );
}
