import { notFound } from "next/navigation";
import { SITE_NAME } from "@/constants";
import { getServerSession } from "@/lib/auth";
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
  return (
    <>
      {/* 【3】【4】はそれぞれのコンポーネント内部で取得 */}
      <MyProfilePanel user={session.user} />
      <MyProfilePhotos page={page} authorId={session.user.id} />
    </>
  );
}
