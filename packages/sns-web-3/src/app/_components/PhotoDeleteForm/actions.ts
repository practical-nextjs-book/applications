"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { deletePhoto } from "@/services/deletePhoto";

export async function deletePhotoAction(photoId: string): Promise<{
  message: string;
} | void> {
  // 【3】誰から送られたリクエストかを特定する
  const session = await getServerSession();
  if (!session) {
    // 【8】削除結果を Client Component に返す
    return { message: `Unauthorized Error` };
  }
  try {
    // 【4】削除リクエストを Web API サーバーに送信
    await deletePhoto({ photoId, userId: session.user.id });
    // ★ 投稿写真画面を Not Found にするため
    revalidatePath(`/photos/${photoId}`);
    // ★ 投稿写真一覧を更新するため
    revalidateTag(`photos?authorId=${session.user.id}`);
  } catch (err) {
    // 【8】削除結果を Client Component に返す
    return { message: "Internal Server Error" };
  }
  // 【8】投稿の詳細画面へリダイレクト
  redirect("/profile");
}
