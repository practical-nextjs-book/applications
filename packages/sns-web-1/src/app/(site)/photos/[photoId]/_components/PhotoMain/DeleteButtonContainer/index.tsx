"use client";

import type { ReactNode } from "react";
import { Button } from "sns-shared-ui/src/components/Button";
import { PhotoDeleteForm } from "@/app/_components/PhotoDeleteForm";
import { useModal } from "@/app/_hooks/useModal";

type Props = {
  id: string;
  className?: string;
  children?: ReactNode;
};

export function DeleteButtonContainer({ id, children }: Props) {
  const { openModal, closeModal, isOpen } = useModal(false);
  return (
    <>
      <Button color="white" onClick={openModal}>
        {children}
      </Button>
      {isOpen && <PhotoDeleteForm id={id} closeModal={closeModal} />}
    </>
  );
}
