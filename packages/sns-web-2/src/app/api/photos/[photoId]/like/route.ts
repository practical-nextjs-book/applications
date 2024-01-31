import { revalidateTag } from "next/cache";
import { getServerSession } from "@/lib/auth";
import { FetchError } from "@/services";
import { postPhotoLike } from "@/services/postPhotoLike";
import type { NextRequest } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: { photoId: string } },
) {
  // 【3】誰から送られた「いいね」かを特定
  const session = await getServerSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    // 【4】Web API サーバーに「いいね」を送信
    await postPhotoLike({ userId, photoId: params.photoId });
    revalidateTag(`photos/${params.photoId}`);
    // 【7】Web API サーバーのレスポンスをフロントに返却
    return Response.json({ liked: true });
  } catch (err) {
    if (err instanceof FetchError) {
      return Response.json({ liked: false }, { status: err.status }); // 【7】
    }
    return Response.json({ liked: false }, { status: 500 }); // 【7】
  }
}
