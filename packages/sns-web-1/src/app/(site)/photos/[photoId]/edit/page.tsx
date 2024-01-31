import { getCategories } from "@/services/getCategories";
import { getPhoto } from "@/services/getPhoto";
import { PhotoHero } from "../_components/PhotoHero";
import { PhotoForm } from "./_components/PhotoForm";

type Props = {
  params: { photoId: string };
};

export default async function Page({ params }: Props) {
  const { photo } = await getPhoto(params.photoId);
  const { categories } = await getCategories();
  return (
    <>
      <PhotoHero photo={photo} />
      <PhotoForm photo={photo} categories={categories} />
    </>
  );
}
