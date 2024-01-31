"use client";

import { useState } from "react";
import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { PhotoDeleteForm } from "@/app/_components/PhotoDeleteForm";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import { useModal } from "@/app/_hooks/useModal";
import type { Photo } from "@/services/type";

type Props = {
  photos: Photo[];
};
export function ClientMyProfilePhotos({ photos }: Props) {
  const { openModal, closeModal, isOpen } = useModal(false);
  const [deletePhotoId, setDeletePhotoId] = useState("");
  return (
    <>
      <CardContainer>
        {photos.map((photo) => (
          <PhotoViewModalContainer photo={photo} key={photo.id}>
            <PhotoCard
              {...photo}
              actionIcon={{
                containerProps: {
                  onClick: (event) => {
                    event.stopPropagation();
                    setDeletePhotoId(photo.id);
                    openModal();
                  },
                },
                iconProps: { type: "trash-box", color: "gray" },
              }}
            />
          </PhotoViewModalContainer>
        ))}
      </CardContainer>
      {isOpen && <PhotoDeleteForm id={deletePhotoId} closeModal={closeModal} />}
    </>
  );
}
