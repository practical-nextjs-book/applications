"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { postPhotoEdit } from "@/services/postPhotoEdit";

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
    throw new Error("Validation error");
  }
  return { photoId, title, description, categoryId, imageUrl };
}

export async function updatePhoto(formData: FormData) {
  const userId = "abcd1234";
  const { photoId, title, description, categoryId, imageUrl } =
    validateFormData(formData);
  await postPhotoEdit({
    photoId,
    title,
    description,
    categoryId,
    imageUrl,
    userId,
  });
  revalidateTag(`photos/${photoId}`);
  redirect(`/photos/${photoId}`);
}
