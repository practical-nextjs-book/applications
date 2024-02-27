"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormState } from "./state";

function validateFormData(formData: FormData) {
  const imageUrl = formData.get("imageUrl");
  const name = formData.get("name");
  const screenName = formData.get("screenName");
  const bio = formData.get("bio");
  if (
    typeof imageUrl !== "string" ||
    typeof name !== "string" ||
    typeof screenName !== "string" ||
    typeof bio !== "string"
  ) {
    throw new Error("Validation error");
  }
  return { imageUrl, name, screenName, bio };
}

export async function updateUser(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  // 【1】誰から送られたリクエストかを特定する
  const session = await getServerSession();
  if (!session) {
    return { message: "未認証です。再度ログインしてください" };
  }
  try {
    const { imageUrl, name, screenName, bio } = validateFormData(formData);
    const userId = session.user.id;
    // 【2】★ ユーザー情報とプロフィール情報をまとめて更新
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { name, image: imageUrl },
      }),
      prisma.profile.update({
        where: { userId },
        data: { screenName, bio, userId },
      }),
    ]);
    // 【3】ユーザーIDに紐づいたキャッシュを Reavalidate
    revalidateTag(`users/${userId}`);
  } catch (err) {
    // 【4】screenName が既に使われている場合はエラーを返す
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { message: "「表示名」がすでに使用されています" };
      }
    }
    // 【5】それ以外のエラー
    return { message: "エラーが発生しました" };
  }
  // 【6】更新が完了したらプロフィール画面にリダイレクト
  redirect("/profile");
}
