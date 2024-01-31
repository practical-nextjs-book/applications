import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { photoId: string } },
) {
  const body = await req.json();
  const comment = await prisma.comment.create({
    data: {
      photoId: params.photoId,
      authorId: body.commentatorId,
      comment: body.comment,
    },
  });
  return Response.json({ comment });
}

export async function GET(
  _: NextRequest,
  { params }: { params: { photoId: string } },
) {
  const comments = await prisma.comment.findMany({
    where: { photoId: params.photoId },
    take: 10,
    orderBy: { createdAt: "desc" },
  });
  console.log(
    `GET: /api/photos/${params.photoId}/comments ${new Date().toISOString()}`,
  );
  return Response.json({ comments });
}
