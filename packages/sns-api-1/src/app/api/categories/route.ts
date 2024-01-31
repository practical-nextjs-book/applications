import { categories } from "@/_mock/categories";

export async function GET() {
  // 🚧: DBに接続しレコードを取得する
  return Response.json({ categories });
}
