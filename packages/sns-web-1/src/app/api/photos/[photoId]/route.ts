import { revalidatePath, revalidateTag } from "next/cache";
import { deletePhoto } from "@/services/deletePhoto";
import type { NextRequest } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { photoId: string } },
) {
  const photo = await deletePhoto({ photoId: params.photoId });
  revalidatePath(`/profile`);
  revalidateTag(`photos/${params.photoId}`);
  return Response.json({ photo });
}
