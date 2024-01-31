import { notFound } from "next/navigation";
import { SITE_NAME } from "@/constants";
import { getServerSession } from "@/lib/auth";
import { getPhotos } from "@/services/getPhotos";
import { MyProfilePhotos } from "../_components/MyProfilePhotos";
import { MyProfileEditPanel } from "./_components/MyProfileEditPanel";
import type { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession();
  if (!session) {
    notFound();
  }
  return { title: `${session.user.name}さんのマイページ | ${SITE_NAME}` };
}

export default async function Page({ searchParams }: Props) {
  const session = await getServerSession();
  if (!session || !session.user) {
    notFound();
  }
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  const { photos, pagination } = await getPhotos({
    page,
    take: "15",
    authorId: session.user.id,
  });
  return (
    <>
      <MyProfileEditPanel user={session.user} />
      <MyProfilePhotos photos={photos} pagination={pagination} page={page} />
    </>
  );
}
