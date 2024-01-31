"use client";
import { useEffect, useContext } from "react";
import { PhotoIdsContext } from "./provider";

export function PhotoIdsContainer({
  photoIds,
  children,
}: {
  photoIds: readonly string[];
  children: React.ReactNode;
}) {
  const photoIdsRef = useContext(PhotoIdsContext);
  useEffect(() => {
    photoIdsRef.current = photoIds;
    return () => {
      photoIdsRef.current = [];
    };
  }, [photoIdsRef, photoIds]);
  return children;
}
