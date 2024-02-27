"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { FetchError } from "@/services";
import { postPhotoComment } from "@/services/postPhotoComment";
import { errors, handleError, handleSuccess } from "./state";
import type { FormState } from "./state";

function validateFormData(formData: FormData) {
  const photoId = formData.get("photoId");
  const comment = formData.get("comment");
  if (typeof photoId !== "string" || typeof comment !== "string") {
    const error = errors[400];
    throw new FetchError(error.message, error.status);
  }
  return { photoId, comment };
}

export async function postComment(formData: FormData): Promise<FormState> {
  const session = await getServerSession();
  if (!session) {
    return handleError(errors[401]);
  }
  const commentatorId = session.user.id;
  try {
    const { photoId, comment } = validateFormData(formData);
    // ★ リクエストを Web API サーバーに送信
    const { comment: commentData } = await postPhotoComment({
      photoId,
      comment,
      commentatorId,
    });
    // ★ 写真投稿のコメント一覧を On-demand Revalidation
    revalidateTag(`photos/${photoId}/comments`);
    return handleSuccess(commentData);
  } catch (err) {
    if (err instanceof FetchError) {
      return handleError({ message: err.message, status: err.status });
    }
    return handleError(errors[500]);
  }
}
