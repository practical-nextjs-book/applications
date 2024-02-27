import { SITE_NAME } from "@/constants";
import { UserPanel } from "./_components/UserPanel";
import { UserPhotos } from "./_components/UserPhotos";
import { getProfileFromScreenName } from "./dataFetch";
import type { Metadata } from "next";

type Props = {
  params: { screenName: string };
};

export function generateStaticParams() {
  // ★: リクエスト時生成に限定する場合は空配列を返す
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ★: params.screenName を渡さないとリクエストメモ化が無効
  const profile = await getProfileFromScreenName(params.screenName);
  return { title: `${profile.user.name}さんの投稿一覧 | ${SITE_NAME}` };
}

export default async function Page({ params: { screenName } }: Props) {
  return (
    <>
      <UserPanel screenName={screenName} />
      <UserPhotos screenName={screenName} />
    </>
  );
}
