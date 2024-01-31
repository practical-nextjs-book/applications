"use server";

import { redirect } from "next/navigation";

export async function updateUser(formData: FormData) {
  const name = formData.get("name");
  const screenName = formData.get("screenName");
  const bio = formData.get("bio");
  const imageUrl = formData.get("imageUrl");
  if (
    typeof name !== "string" ||
    typeof screenName !== "string" ||
    typeof bio !== "string" ||
    typeof imageUrl !== "string"
  ) {
    throw new Error("Validation error");
  }
  redirect("/profile");
}
