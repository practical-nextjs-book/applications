import { revalidateTag } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { postPhotos } from "@/services/postPhotos";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // 【5】誰から送られたリクエストかを特定する
  const session = await getServerSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    // 【6】投稿者 ID と情報をまとめて Web API サーバーに送信
    const body = await req.json();
    const { photo } = await postPhotos({
      userId: session.user.id,
      imageUrl: body.imageUrl,
      title: body.title,
      categoryId: body.categoryId,
      description: body.description,
    });
    revalidateTag(`photos?authorId=${session.user.id}`);
    // 【9】保存結果を Client Component に返す
    return Response.json({ photo }, { status: 201 });
  } catch (err) {
    // 【9】保存結果を Client Component に返す
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
