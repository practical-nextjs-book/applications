import { TopCategories } from "./_components/TopCategories";
import { TopPhotos } from "./_components/TopPhotos";
import { TopUsers } from "./_components/TopUsers";
import styles from "./style.module.css";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: Props) {
  // 【1】【2】【3】のデータ取得がなくなっている
  return (
    <div className={styles.page}>
      <div className={styles.photos}>
        <TopPhotos searchParams={searchParams} />
      </div>
      <aside className={styles.aside}>
        <TopCategories />
        <TopUsers />
      </aside>
    </div>
  );
}
