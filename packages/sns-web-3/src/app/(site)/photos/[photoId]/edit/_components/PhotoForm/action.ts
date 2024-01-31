"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { getServerSession } from "@/lib/auth";
import { FetchError } from "@/services";
import { getCategories } from "@/services/getCategories";
import { postPhotoEdit } from "@/services/postPhotoEdit";
import { errors, handleError } from "./state";
import { transformFiledErrors, validateFormData } from "./validate";
import type { FormState } from "./state";

// 📌: 更新前後の categoryName を取得
async function getNextPrevCategoryName(
  prevCategoryId: string,
  nextCategoryId: string,
) {
  const { categories } = await getCategories();
  const prevCategoryName = categories.find(
    (category) => category.id === prevCategoryId,
  )?.name;
  const nextCategoryName = categories.find(
    (category) => category.id === nextCategoryId,
  )?.name;
  if (!prevCategoryName || !nextCategoryName) {
    const error = errors[400];
    throw new FetchError(error.message, error.status);
  }
  return { prevCategoryName, nextCategoryName };
}

export async function updatePhoto(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession();
  if (!session) {
    return handleError(prevState, errors[401]);
  }
  const userId = session.user.id;
  let photoId = "";
  try {
    // 📌: バリデーションエラーが発生した場合 catch 句へ
    const payload = validateFormData(formData);
    // 📌: Revalidate 対象のカテゴリー名を取得
    const { prevCategoryName, nextCategoryName } =
      await getNextPrevCategoryName(prevState.categoryId, payload.categoryId);
    // Web API サーバーへの更新リクエスト
    const { photo } = await postPhotoEdit({ ...payload, userId });
    photoId = photo.id;
    // 📌: 対象の投稿写真画面キャッシュを Revalidate
    revalidatePath(`/photos/${photoId}`);
    // 📌: プロフィール画面の写真一覧キャッシュを Revalidate
    revalidateTag(`photos?authorId=${userId}`);
    // 📌: 更新後のカテゴリー一覧キャッシュを Revalidate
    revalidateTag(`categories/${prevCategoryName}`);
    if (prevCategoryName !== nextCategoryName) {
      // 📌: カテゴリー変更先の一覧キャッシュを Revalidate
      revalidateTag(`categories/${nextCategoryName}`);
    }
  } catch (err) {
    if (err instanceof FetchError) {
      return handleError(prevState, {
        message: err.message,
        status: err.status,
      });
    }
    // 📌: Zod のバリデーションエラーをマッピング
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFiledErrors(err),
      });
    }
    return handleError(prevState, errors[500]);
  }
  redirect(`/photos/${photoId}`);
}
