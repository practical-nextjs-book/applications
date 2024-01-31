import { photos } from "@/_mock/photos";

export async function GET(request: Request) {
  // 🚧: DBに接続しレコードを取得する
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  if (authorId) {
    return Response.json({
      photos: photos.filter((photo) => photo.authorId === authorId),
    });
  }
  return Response.json({ photos });
}

export async function POST(request: Request) {
  // 🚧: DBに接続しレコードを更新する
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");
  if (authorId) {
    return Response.json({
      photos: photos.filter((photo) => photo.authorId === authorId),
    });
  }
  return Response.json({ photos });
}
