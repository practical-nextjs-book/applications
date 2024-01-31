import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getPhotoComments } from "@/services/getPhotoComments";
import type { Photo } from "@/services/type";
import { ClientPhotoComment } from "./client";

type Props = {
  photo: Photo;
  userId?: string;
};

export async function PhotoComment({ photo, userId }: Props) {
  const { comments, authors } = await unstable_cache(
    async (id: string) => {
      const { comments } = await getPhotoComments({ id });
      const authorIds = Array.from(
        new Set(comments.map((comment) => comment.authorId))
      );
      const authors = await prisma.user.findMany({
        where: { id: { in: authorIds } },
        select: {
          id: true,
          name: true,
          image: true,
          profile: { select: { screenName: true } },
        },
      });
      return { comments, authors };
    },
    [`photos/comments`],
    { tags: [`photos/${photo.id}/comments`] }
  )(photo.id);
  return (
    <ClientPhotoComment
      photoId={photo.id}
      userId={userId}
      defaultComments={comments}
      authors={authors}
    />
  );
}
