import { categories } from "@/_mock/categories";
import type { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { categoryName: string } },
) {
  // 🚧: DBに接続しレコードを取得する
  const category = categories.find(
    (category) => category.name === params.categoryName,
  );
  if (!category) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  return Response.json({ category });
}
