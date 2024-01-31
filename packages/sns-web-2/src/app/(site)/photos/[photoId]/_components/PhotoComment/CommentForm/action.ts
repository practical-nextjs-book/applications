"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { postPhotoComment } from "@/services/postPhotoComment";
import { initialFormState, type FormState } from "./state";

function validateFormData(formData: FormData) {
  const photoId = formData.get("photoId");
  const comment = formData.get("comment");
  if (typeof photoId !== "string" || typeof comment !== "string") {
    throw new Error("Validation error");
  }
  return { photoId, comment };
}

export async function postComment(
  _: FormState | null,
  formData: FormData,
): Promise<FormState | null> {
  const session = await getServerSession();
  if (!session) {
    return { ...initialFormState(), error: { message: "Unauthorized" } };
  }
  try {
    const commentatorId = session.user.id;
    const { photoId, comment } = validateFormData(formData);
    await postPhotoComment({ photoId, comment, commentatorId });
    revalidatePath(`/photos/${photoId}`);
  } catch (error) {
    return {
      ...initialFormState(),
      error: { message: "Internal Server Error" },
    };
  }
  return { ...initialFormState() };
}
