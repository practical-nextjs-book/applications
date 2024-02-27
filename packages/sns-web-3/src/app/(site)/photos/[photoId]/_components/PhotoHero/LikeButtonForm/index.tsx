"use client";

import { signIn } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";
import { AlertDialogModal } from "sns-shared-ui/src/components/AlertDialogModal";
import { Button } from "sns-shared-ui/src/components/Button";
import { LikeButton } from "sns-shared-ui/src/components/LikeButton";
import { useModal } from "@/app/_hooks/useModal";
import type { Photo } from "@/services/type";
import { postLike } from "./actions";
import { initialFormState } from "./state";

type Props = {
  photo: Photo;
  isOwner: boolean;
  liked: boolean;
};

export function LikeButtonForm({ photo, isOwner, liked }: Props) {
  // 【1】「いいね」総数が何件か「いいね」済みか否かを、初期値として保持
  const [state, dispatch] = useFormState(
    postLike,
    initialFormState({ liked, likedCount: photo.likedCount }),
  );
  return (
    <form action={dispatch}>
      <input type="hidden" name="photoId" value={photo.id} />
      <LikeButtonComponent
        likedCount={state.likedCount} // 【3】送信に成功した場合「いいね」数が増える
        disabled={isOwner || Boolean(state.liked)}
      />
      {/* 【4】送信に失敗した場合、AlertDialog を表示 */}
      {state.error && (
        <AlertDialogModalComponent
          key={state.updatedAt} // ★ エラーが発生するごとに再マウント、内部状態が破棄される
          status={state.error.status}
        />
      )}
    </form>
  );
}

function LikeButtonComponent({
  likedCount,
  disabled,
}: {
  likedCount: number;
  disabled: boolean;
}) {
  // 【2】「いいね」送信中は、ボタンを非活性に
  const { pending } = useFormStatus();
  return (
    <LikeButton
      count={likedCount}
      disabled={disabled}
      isSubmitting={pending}
      type="submit"
    />
  );
}

function AlertDialogModalComponent({ status }: { status: number }) {
  // 【5】エラーの種類によりコンテンツを出しわけ
  const { isOpen, closeModal } = useModal(true);
  if (!isOpen) return null;
  return status === 401 ? (
    <AlertDialogModal
      messageNode={`ログインが必要な機能です\nログインしますか？`}
      actionsNode={
        <>
          <Button color="white" onClick={closeModal}>
            キャンセル
          </Button>
          <Button onClick={() => signIn()}>ログイン</Button>
        </>
      }
    />
  ) : status === 409 ? (
    <AlertDialogModal
      messageNode={`この写真には既に\n「いいね」しています`}
      actionsNode={<Button onClick={closeModal}>OK</Button>}
    />
  ) : (
    <AlertDialogModal
      messageNode={`エラーが発生しました`}
      actionsNode={<Button onClick={closeModal}>OK</Button>}
    />
  );
}
