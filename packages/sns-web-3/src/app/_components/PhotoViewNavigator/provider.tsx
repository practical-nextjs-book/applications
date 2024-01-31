"use client";
import { createContext, useRef } from "react";

export const PhotoIdsContext = createContext<
  React.MutableRefObject<readonly string[]>
>({ current: [] });

export function PhotoIdsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const photoIdsRef = useRef<readonly string[]>([]);
  return (
    <PhotoIdsContext.Provider value={photoIdsRef}>
      {children}
    </PhotoIdsContext.Provider>
  );
}
