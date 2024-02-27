import Link from "next/link";
import { notFound } from "next/navigation";
import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Pagination } from "sns-shared-ui/src/components/Pagination";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoIdsContainer } from "@/app/_components/PhotoViewNavigator/container";
import { SITE_NAME } from "@/constants";
import { getCategories } from "@/services/getCategories";
import { getCategory } from "@/services/getCategory";
import styles from "./style.module.css";
import type { Metadata } from "next";

type Props = {
  params: { segments: string[] };
};

const take = 15;

export async function generateStaticParams() {
  // 【1】全てのカテゴリーを取得
  const { categories } = await getCategories();
  // 【2】各カテゴリーごとに、ビルド時生成するページを決める
  return categories.flatMap((category) => {
    const categoryName = category.name;
    // 番号無しページ（各カテゴリーTOP）
    const indexPage = { segments: [categoryName] };
    // 対象カテゴリーの総ページ数を計算
    const pageCount = Math.ceil(category.totalPhotoCount / take);
    // 番号有りページ数は最大 5 画面まで（5 画面目以降はリクエスト時生成）
    const nestedPagesCount = pageCount > 5 ? 5 : pageCount;
    const nestedPages = Array.from({ length: nestedPagesCount }, (_, i) => ({
      segments: [categoryName, `${i + 1}`],
    }));
    return [indexPage, ...nestedPages];
  });
}

async function getCategoryFromProps({ params }: Props) {
  const categoryName =
    typeof params.segments[0] === "string" ? params.segments[0] : "1";
  const page =
    typeof params.segments[1] === "string" ? params.segments[1] : "1";
  // ★: /categories/flower/1/2 などの場合は 404 を返す
  if (params.segments.length > 2) {
    notFound();
  }
  const data = await getCategory({
    categoryName,
    page,
    take: `${take}`,
  });
  return { ...data, page: +page };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  // ★: generateMetadata と Page で引数の異なる fetch 関数を呼び出さないよう注意
  const data = await getCategoryFromProps(props);
  return { title: `${data.category.label}の写真一覧 | ${SITE_NAME}` };
}

export default async function Page(props: Props) {
  const data = await getCategoryFromProps(props);
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
            <PhotoIdsContainer
              photoIds={data.category.photos.map((photo) => photo.id)}
            >
              {data.category.photos.map((photo) => (
                <Link
                  key={photo.id}
                  href={`/photos/${photo.id}/view`}
                  prefetch={true}
                >
                  <PhotoCard {...photo} />
                </Link>
              ))}
            </PhotoIdsContainer>
          </CardContainer>
        )}
      </Section>
      <Pagination
        currentPage={data.page}
        pagination={data.pagination}
        pathname={`/categories/${data.category.name}`}
        separator="/"
      />
    </div>
  );
}
