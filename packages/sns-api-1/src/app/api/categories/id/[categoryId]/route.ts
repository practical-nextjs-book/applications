import { categories } from "@/_mock/categories";
import type { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { categoryId: string } },
) {
  // 🚧: DBに接続しレコードを取得する
  const category = categories.find(
    (category) => category.id === params.categoryId,
  );
  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ category });
}
