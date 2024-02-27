"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertDialogModal } from "sns-shared-ui/src/components/AlertDialogModal";
import { Button } from "sns-shared-ui/src/components/Button";
import { deletePhotoAction } from "./actions";

type Props = {
  id: string;
  closeModal: () => void;
};

function AlertDialogModalComponent({
  error,
  closeModal,
}: {
  error?: string;
  closeModal: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, []);
  // ★ form 要素の子コンポーネントで使用する
  const { pending } = useFormStatus();
  // 状態に応じてメッセージを切り替える
  const message = pending
    ? `...削除しています`
    : `この写真を削除します\n本当によろしいですか？`;
  return (
    <AlertDialogModal
      messageNode={error || message}
      actionsNode={
        <>
          <Button
            type="button"
            color="gray"
            ref={buttonRef}
            onClick={closeModal}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={pending}>
            OK
          </Button>
        </>
      }
    />
  );
}

export function PhotoDeleteForm({ id, closeModal }: Props) {
  const [error, setError] = useState<string>();
  // 【1】送信処理の開始
  const handleAction = async () => {
    // 【2】削除 Server Action を呼ぶ
    const err = await deletePhotoAction(id);
    // ★ router.refresh(); と router.push(); が不要
    if (err) {
      // 【9】戻り値がある場合はエラー文字切り替え
      setError(err.message);
      return;
    }
    closeModal();
  };
  return (
    <form action={handleAction}>
      <input type="hidden" name="id" value={id} />
      <AlertDialogModalComponent error={error} closeModal={closeModal} />
    </form>
  );
}
