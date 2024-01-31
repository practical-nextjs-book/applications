import { notFound } from "next/navigation";
import { SITE_NAME } from "@/constants";
import { getServerSession } from "@/lib/auth";
import { getCategories } from "@/services/getCategories";
import { getPhoto } from "@/services/getPhoto";
import { PhotoHero } from "../_components/PhotoHero";
import { PhotoForm } from "./_components/PhotoForm";
import type { Metadata } from "next";

type Props = {
  params: { photoId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { photo } = await getPhoto({ id: params.photoId });
  if (!photo) {
    notFound();
  }
  return {
    title: `${photo.title} | ${SITE_NAME}`,
    description: photo.description,
  };
}

export default async function Page({ params }: Props) {
  const [session, { photo }, { categories }] = await Promise.all([
    getServerSession(),
    getPhoto({ id: params.photoId }),
    getCategories(),
  ]);
  if (!photo || session?.user.id !== photo.authorId) {
    notFound();
  }
  return (
    <>
      <PhotoHero photo={photo} isOwner={true} liked={true} />
      <PhotoForm photo={photo} categories={categories} />
    </>
  );
}
