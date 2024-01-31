"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { FetchError } from "@/services";
import { postPhotoLike } from "@/services/postPhotoLike";
import { errors, handleError, handleSuccess } from "./state";
import type { FormState } from "./state";

export async function postLike(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // 誰から送られたリクエストかを特定する
  const session = await getServerSession();
  if (!session) {
    // × エラー状態を返す
    return handleError(prevState, errors[401]);
  }
  const photoId = formData.get("photoId");
  if (typeof photoId !== "string") {
    // × エラー状態を返す
    return handleError(prevState, errors[400]);
  }
  const userId = session.user.id;
  try {
    // Web API サーバーに「いいね」を送信
    await postPhotoLike({ userId, photoId });
    // 投稿写真IDに紐づいたキャッシュを Reavalidate
    revalidateTag(`photos/${photoId}`);
    // ○ いいね済み状態を返す
    return handleSuccess(prevState);
  } catch (err) {
    if (err instanceof FetchError) {
      // × エラー状態を返す
      return handleError(prevState, {
        message: err.message,
        status: err.status,
      });
    }
    // × エラー状態を返す
    return handleError(prevState, errors[500]);
  }
}
