import { profiles, users } from "@/_mock";
import { SITE_NAME } from "@/constants";
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

export default async function Page() {
  const photosData = await getPhotos({});
  const categoriesData = await getCategories();
  return (
    <div className={styles.page}>
      <div className={styles.photos}>
        <TopPhotos {...photosData} />
      </div>
      <aside className={styles.aside}>
        <TopCategories {...categoriesData} />
        {/* 🚧: ユーザー一覧を取得する */}
        <TopUsers users={users} profiles={profiles} />
      </aside>
    </div>
  );
}
