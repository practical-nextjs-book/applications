import { notFound } from "next/navigation";
import { users } from "@/_mock";
import { getCategoryById } from "@/services/getCategoryById";
import { getPhoto } from "@/services/getPhoto";
import { PhotoHero } from "./_components/PhotoHero";
import { PhotoMain } from "./_components/PhotoMain";

type Props = {
  params: { photoId: string };
};

export default async function Page({ params }: Props) {
  const { photo } = await getPhoto(params.photoId);
  if (!photo) {
    notFound();
  }
  const author = users.find((user) => user.id === photo.authorId);
  if (!author) {
    notFound();
  }
  const { category } = await getCategoryById(photo.categoryId);
  const isOwner = false;
  const isLoggedIn = true;
  return (
    <>
      <PhotoHero photo={photo} />
      <PhotoMain
        photo={photo}
        category={category}
        author={author}
        isOwner={isOwner}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
