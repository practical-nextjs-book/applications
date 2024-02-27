"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useKey } from "@/app/_hooks/useKey";
import { PhotoIdsContext } from "./provider";

export function PhotoViewNavigator({ photoId }: { photoId: string }) {
  const router = useRouter();
  const photoIds = useContext(PhotoIdsContext).current;
  const currentIndex = photoIds.indexOf(photoId);
  const prevPhotoId = currentIndex > 0 ? photoIds[currentIndex - 1] : undefined;
  const nextPhotoId =
    currentIndex >= 0 && currentIndex < photoIds.length - 1
      ? photoIds[currentIndex + 1]
      : undefined;

  useKey("ArrowLeft", () => {
    if (prevPhotoId) {
      // ★: ソフトナビーゲーションによる画面遷移
      router.replace(`/photos/${prevPhotoId}/view`, { scroll: false });
    }
  });
  useKey("ArrowRight", () => {
    if (nextPhotoId) {
      // ★: ソフトナビーゲーションによる画面遷移
      router.replace(`/photos/${nextPhotoId}/view`, { scroll: false });
    }
  });

  return null;
}
