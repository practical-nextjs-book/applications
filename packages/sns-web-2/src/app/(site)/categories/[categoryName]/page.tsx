import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Pagination } from "sns-shared-ui/src/components/Pagination";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import { SITE_NAME } from "@/constants";
import { getCategory } from "@/services/getCategory";
import styles from "./style.module.css";
import type { Metadata } from "next";

type Props = {
  params: { categoryName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.categoryName;
  // 【4】Page で使用しているデータ取得関数と同じだが、パラメーターが異なる
  const data = await getCategory({ categoryName });
  return { title: `${data.category.label}の写真一覧 | ${SITE_NAME}` };
}

export default async function Page({ params, searchParams }: Props) {
  // 【1】"flower"などのカテゴリー名
  const categoryName = params.categoryName;
  // 【2】ページ番号
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  // 【3】Web API サーバーからデータを取得
  const data = await getCategory({ categoryName, page, take: "15" });
  return (
    <div className={styles.page}>
      <Section>
        <HeadGroup>
          <Heading level={1} size="medium">
            {data.category.label}
          </Heading>
        </HeadGroup>
        {data.category.photos.length > 0 && (
          <CardContainer>
            {data.category.photos.map((photo) => (
              <PhotoViewModalContainer key={photo.id} photo={photo}>
                <PhotoCard {...photo} />
              </PhotoViewModalContainer>
            ))}
          </CardContainer>
        )}
      </Section>
      <Pagination
        currentPage={+page}
        pagination={data.pagination}
        pathname={`/categories/${data.category.name}`}
      />
    </div>
  );
}
