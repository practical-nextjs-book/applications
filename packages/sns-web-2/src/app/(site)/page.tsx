import { SITE_NAME } from "@/constants";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/services/getCategories";
import { getPhotos } from "@/services/getPhotos";
import { TopCategories } from "./_components/TopCategories";
import { TopPhotos } from "./_components/TopPhotos";
import { TopUsers } from "./_components/TopUsers";
import styles from "./style.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_NAME,
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: Props) {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  // 【1】最新投稿写真一覧に使用するデータ
  const photosData = await getPhotos({ page });
  // 【2】カテゴリー一覧に使用するデータ
  const categoriesData = await getCategories();
  // 【3】ユーザー一覧に使用するデータ
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      profile: { select: { screenName: true } },
    },
  });
  return (
    <div className={styles.page}>
      <div className={styles.photos}>
        <TopPhotos {...photosData} page={page} />
      </div>
      <aside className={styles.aside}>
        <TopCategories {...categoriesData} />
        <TopUsers users={users} />
      </aside>
    </div>
  );
}
