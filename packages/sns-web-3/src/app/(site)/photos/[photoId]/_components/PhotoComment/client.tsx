"use client";

import { useOptimistic, useRef, useState } from "react";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";
import type { Comment } from "@/services/type";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { postComment } from "./action";

type Props = {
  photoId: string;
  userId?: string;
  defaultComments: Comment[];
  authors: {
    profile: {
      screenName: string | null;
    } | null;
    id: string;
    name: string | null;
    image: string | null;
  }[];
};

function useOptimisticUpdate({
  photoId,
  userId,
  defaultComments,
}: {
  photoId: string;
  userId?: string;
  defaultComments: Comment[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  // 【1】親から渡されたコメント一覧初期値を状態に保持
  const [comments, setComments] = useState(defaultComments);
  // ★ 一覧表示に使用する optimisticComments
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (prevComments, newComment: Comment) => {
      if (prevComments.length <= 1) return [newComment];
      if (prevComments[0]?.comment === newComment.comment) return prevComments;
      //【3】入力されたコメントをコメント一覧に追加し、Form 送信が完了するまでこの値が現れる
      return [{ ...newComment, sending: true }, ...prevComments];
    }
  );
  // form の action 属性にわたす関数
  async function formAction(formData: FormData) {
    const comment = formData.get("comment");
    if (typeof comment !== "string") return;
    const now = new Date();
    const createdAt = now.toISOString();
    const id = `comment-${createdAt}`;
    // 【2】Optimistic Update を実行する
    addOptimisticComment({
      id,
      createdAt,
      authorId: userId || "",
      photoId,
      comment,
    });
    // 更新後にフォームの入力値をリセットする
    formRef.current?.reset();
    // Server Action を実行して、コメントを送信する
    const data = await postComment(formData);
    if (!data.comment) return;
    // 【4】Server Action の結果を通常 state に反映する
    setComments([data.comment, ...defaultComments]);
  }
  return { optimisticComments, formRef, formAction };
}

export function ClientPhotoComment({
  photoId,
  userId,
  authors,
  defaultComments,
}: Props) {
  const { optimisticComments, formRef, formAction } = useOptimisticUpdate({
    photoId,
    userId,
    defaultComments,
  });
  return (
    <div>
      {userId && (
        <Section>
          <HeadGroup>
            <Heading level={3} size="small">
              コメント投稿
            </Heading>
          </HeadGroup>
          <CommentForm
            photoId={photoId}
            formRef={formRef}
            formAction={formAction}
          />
        </Section>
      )}
      <Section>
        <HeadGroup>
          <Heading level={3} size="small">
            コメント一覧
          </Heading>
        </HeadGroup>
        <CommentList
          comments={optimisticComments.slice(0, 10)}
          authors={authors}
        />
      </Section>
    </div>
  );
}
