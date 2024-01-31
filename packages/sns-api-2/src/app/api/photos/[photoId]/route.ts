import { Prisma, prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { photoId: string } },
) {
  const data = await prisma.photo.findUnique({
    where: { id: params.photoId },
    include: { _count: { select: { likes: true } } },
  });
  if (!data) {
    return Response.json({ message: "Not Found" }, { status: 404 });
  }
  const {
    _count: { likes },
    ...photo
  } = data;
  console.log(`GET: /api/photos/${params.photoId} ${new Date().toISOString()}`);
  return Response.json({ photo: { ...photo, likedCount: likes } });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { photoId: string } },
) {
  try {
    // 【5】リクエストパラメーターを検証する
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (typeof userId !== "string") {
      return Response.json({ message: "Bad Request" }, { status: 400 });
    }
    // 【6】DB の投稿を物理削除する
    const photo = await prisma.photo.delete({
      where: { id: params.photoId, authorId: userId },
    });
    console.log(
      `DELETE: /api/photos/${params.photoId} ${new Date().toISOString()}`,
    );
    // 【7】削除結果を Route Handler に返す
    return Response.json({ photo }, { status: 200 });
  } catch (err) {
    // 【7】削除結果を Route Handler に返す（エラーレスポンスを返す）
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2015") {
        return Response.json({ message: "Not Found" }, { status: 404 });
      }
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
