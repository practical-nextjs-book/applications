"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { FetchError } from "@/services";
import { postPhotoEdit } from "@/services/postPhotoEdit";
import { errors, handleError } from "./state";
import type { FormState } from "./state";

function validateFormData(formData: FormData) {
  const photoId = formData.get("photoId");
  const title = formData.get("title");
  const description = formData.get("description");
  const categoryId = formData.get("categoryId");
  const imageUrl = formData.get("imageUrl");
  if (
    typeof photoId !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof categoryId !== "string" ||
    typeof imageUrl !== "string"
  ) {
    const error = errors[400];
    throw new FetchError(error.message, error.status);
  }
  return { photoId, title, description, categoryId, imageUrl };
}

export async function updatePhoto(prevState: FormState, formData: FormData) {
  const session = await getServerSession();
  if (!session) {
    return handleError(prevState, errors[401]);
  }
  const userId = session.user.id;
  let photoId = "";
  try {
    const payload = validateFormData(formData);
    if (!payload.title) {
      return handleError(prevState, errors[400]);
    }
    const { photo } = await postPhotoEdit({ ...payload, userId });
    photoId = photo.id;
    // 📌: 対象の投稿写真画面キャッシュを Revalidate
    revalidatePath(`/photos/${photoId}`);
    // 📌: 抽象的なタグの Revalidate
    revalidateTag("categories");
  } catch (err) {
    if (err instanceof FetchError) {
      return handleError(prevState, {
        message: err.message,
        status: err.status,
      });
    }
    return handleError(prevState, errors[500]);
  }
  redirect(`/photos/${photoId}`);
}
