"use client";

import { useState, type ReactNode } from "react";
import type { Photo } from "@/services/type";
import { ModalContainer } from "../ModalContainer";
import { PhotoViewModal } from "../PhotoViewModal";

export function PhotoViewModalContainer({
  photo: { likedCount, ...photo },
  children,
}: {
  photo: Photo;
  children: ReactNode;
}) {
  const [liked, setLiked] = useState(false);
  const [localLikedCount, setLocallikedCount] = useState(likedCount);
  const handleClickLike = (count: number) => {
    setLiked(true);
    setLocallikedCount(count);
  };
  return (
    <ModalContainer
      content={(closeModal) => (
        <PhotoViewModal
          {...photo}
          likedCount={localLikedCount}
          liked={liked}
          close={closeModal}
          onClickLike={handleClickLike}
        />
      )}
    >
      {children}
    </ModalContainer>
  );
}
