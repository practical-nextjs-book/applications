import { revalidateTag } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { deletePhoto } from "@/services/deletePhoto";
import type { NextRequest } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { photoId: string } },
) {
  // 【3】誰から送られたリクエストかを特定する
  const session = await getServerSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    // 【4】削除リクエストを Web API サーバーに送信
    const photo = await deletePhoto({
      photoId: params.photoId,
      userId: session.user.id,
    });
    revalidateTag(`photos/${params.photoId}`);
    revalidateTag(`photos?authorId=${session.user.id}`);
    // 【8】削除結果を Client Component に返す
    return Response.json({ photo });
  } catch (err) {
    // 【8】削除結果を Client Component に返す
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
