import { prisma, Prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { photoId: string } },
) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return Response.json({ message: "Invalid Params" }, { status: 400 });
  }
  const like = await prisma.like.findFirst({
    where: { photoId: params.photoId, userId },
  });
  return Response.json({ liked: !!like });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { photoId: string } },
) {
  try {
    const body = await req.json();
    // 【5】Web API サーバーから DB サーバーへ Prisma Client を経由して「いいね」作成
    const like = await prisma.like.create({
      data: { photoId: params.photoId, userId: body.userId },
    });
    // 【6】Web API サーバーのレスポンスが`sns-web-2`に返される
    return Response.json({ liked: !!like });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return Response.json({ message: "Already liked" }, { status: 409 }); // 【6】
      }
    }
    return Response.json({ message: "Internal Server Error" }, { status: 500 }); // 【6】
  }
}
