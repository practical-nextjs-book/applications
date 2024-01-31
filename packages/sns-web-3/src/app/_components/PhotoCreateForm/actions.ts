"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { postPhotos } from "@/services/postPhotos";

type Payload = {
  imageUrl: string;
  title: string;
  categoryId: string;
  description: string;
};

export async function postPhotoAction(payload: Payload) {
  // 【5】誰から送られたリクエストかを特定する
  const session = await getServerSession();
  if (!session) {
    return { message: "Unauthorized" };
  }
  let photoId = "";
  try {
    // 【6】投稿者 ID と情報をまとめて Web API サーバーに送信
    const { photo } = await postPhotos({
      userId: session.user.id,
      imageUrl: payload.imageUrl,
      title: payload.title,
      categoryId: payload.categoryId,
      description: payload.description,
    });
    // 📌 On-demand Revalidation
    revalidateTag(`photos?authorId=${session.user.id}`);
    photoId = photo.id;
  } catch (err) {
    // 【9】保存結果を Client Component に返す
    return { message: "Internal Server Error" };
  }
  // 【9】📌 投稿の詳細画面へリダイレクト
  redirect(`/photos/${photoId}`);
}
