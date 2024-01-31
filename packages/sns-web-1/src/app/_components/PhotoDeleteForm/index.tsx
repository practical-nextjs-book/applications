import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialogModal } from "sns-shared-ui/src/components/AlertDialogModal";
import { Button } from "sns-shared-ui/src/components/Button";

type Props = {
  id: string;
  closeModal: () => void;
};

export function PhotoDeleteForm({ id, closeModal }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!buttonRef.current) return;
    buttonRef.current.focus();
  }, []);
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        await fetch(`/api/photos/${id}`, { method: "DELETE" });
        setIsSubmitting(false);
        closeModal();
        router.push("/profile");
      }}
    >
      <AlertDialogModal
        messageNode={
          isSubmitting ? (
            <>...削除しています</>
          ) : (
            <>
              この写真を削除します
              <br />
              本当によろしいですか？
            </>
          )
        }
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
            <Button type="submit">OK</Button>
          </>
        }
      />
    </form>
  );
}
