import { notFound } from "next/navigation";
import { SITE_NAME } from "@/constants";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPhotos } from "@/services/getPhotos";
import { MyProfilePanel } from "./_components/MyProfilePanel";
import { MyProfilePhotos } from "./_components/MyProfilePhotos";
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
  // 【1】ログインユーザーからのリクエストであるかをチェック
  const session = await getServerSession();
  if (!session || !session.user) {
    notFound();
  }
  // 【2】ページネーション向けに、ページ番号を特定
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  // 【3】ログインユーザーIDを参照し、プロフィール情報を取得
  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id },
  });
  // 【4】ログインユーザーの投稿写真一覧を取得
  const { photos, pagination } = await getPhotos({
    page,
    take: "15",
    authorId: session.user.id,
  });
  return (
    <>
      <MyProfilePanel user={session.user} profile={profile} />
      <MyProfilePhotos photos={photos} pagination={pagination} page={page} />
    </>
  );
}
