import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { photoId: string } },
) {
  const body = await req.json();
  const { categoryId, userId, ...data } = body;
  const photo = await prisma.photo.update({
    where: { id: params.photoId },
    include: { category: true },
    data: {
      ...data,
      authorId: userId,
      category: {
        connect: { id: categoryId },
      },
    },
  });
  return Response.json({ photo });
}
