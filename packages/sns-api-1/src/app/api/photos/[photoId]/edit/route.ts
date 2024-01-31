import { photos } from "@/_mock/photos";
import type { NextRequest } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: { photoId: string } },
) {
  // 🚧: DBに接続しレコードを更新する
  const photo = photos.find((photo) => photo.id === params.photoId);
  if (!photo) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ photo });
}
