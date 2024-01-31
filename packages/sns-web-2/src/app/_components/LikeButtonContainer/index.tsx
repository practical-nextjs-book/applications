"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { AlertDialogModal } from "sns-shared-ui/src/components/AlertDialogModal";
import { Button } from "sns-shared-ui/src/components/Button";
import { LikeButton } from "sns-shared-ui/src/components/LikeButton";
import { useModal } from "@/app/_hooks/useModal";

type Props = {
  count: number;
  id: string;
  disabled?: boolean;
  liked?: boolean;
  className?: string;
  onClickLike?: (count: number) => void;
};

function AlertDialogModalComponent({
  status,
  closeModal,
}: {
  status: number;
  closeModal: () => void;
}) {
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

export function LikeButtonContainer({
  id,
  count,
  disabled,
  liked,
  className,
  onClickLike,
}: Props) {
  const [likeCount, setLikeCount] = useState(count);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(500);
  const { openModal, closeModal, isOpen } = useModal(false);
  // 【1】ブラウザで「いいねボタン」をクリック
  const handleClickLike = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // 【2】Client Component から Route Handler へ fetch 関数リクエスト
      const res = await fetch(`/api/photos/${id}/like`, {
        method: "POST",
      });
      if (res.ok) {
        // 【8】成功した場合「いいね数」をカウントアップ
        onClickLike?.(likeCount + 1);
        setLikeCount((prev) => prev + 1);
      } else {
        // 【9】失敗した場合、エラーモーダルを表示する
        setStatus(res.status);
        openModal();
      }
    } catch (err) {
      openModal(); // 【9】
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <LikeButton
        count={likeCount}
        isSubmitting={isSubmitting}
        disabled={liked || isSubmitting || disabled}
        className={className}
        onClick={handleClickLike}
      />
      {/* 【9】 */}
      {isOpen && (
        <AlertDialogModalComponent status={status} closeModal={closeModal} />
      )}
    </>
  );
}
