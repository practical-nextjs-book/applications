import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialogModal } from "sns-shared-ui/src/components/AlertDialogModal";
import { Button } from "sns-shared-ui/src/components/Button";

type Props = {
  id: string;
  closeModal: () => void;
};

function AlertDialogModalComponent({
  isSubmitting,
  error,
  closeModal,
}: {
  isSubmitting: boolean;
  error?: string;
  closeModal: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, []);
  // 状態に応じてメッセージを切り替える
  const message = isSubmitting
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
          <Button type="submit" disabled={isSubmitting}>
            OK
          </Button>
        </>
      }
    />
  );
}

export function PhotoDeleteForm({ id, closeModal }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 【1】送信処理の開始
  const handleAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // 【2】削除 Route Handler を呼ぶ
      await fetch(`/api/photos/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("削除に失敗しました");
        return res.json();
      });
      router.refresh();
      // 【9】成功した場合、profile へ遷移
      router.push("/profile");
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      // 【9】失敗した場合、メッセージを切り替える
      setError(err.message);
      return;
    } finally {
      setIsSubmitting(false);
    }
    closeModal();
  };
  return (
    <form onSubmit={handleAction}>
      <AlertDialogModalComponent
        isSubmitting={isSubmitting}
        error={error}
        closeModal={closeModal}
      />
    </form>
  );
}
