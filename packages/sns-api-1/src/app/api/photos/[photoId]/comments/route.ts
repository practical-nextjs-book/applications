import type { Comment } from "@/_mock";

export async function POST() {
  // 🚧: DBに接続しレコードを作成する
  const comment: Comment = {
    id: "1",
    authorId: "authorId",
    photoId: "photoId",
    comment: "comment",
  };
  return Response.json({ comment });
}

export async function GET() {
  // 🚧: DBに接続しレコードを取得する
  return Response.json({ comments: [] });
}
