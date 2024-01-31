import Link from "next/link";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Pagination } from "sns-shared-ui/src/components/Pagination";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoIdsContainer } from "@/app/_components/PhotoViewNavigator/container";
import { getPhotos } from "@/services/getPhotos";
import styles from "./style.module.css";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function TopPhotos({ searchParams }: Props) {
  const page = typeof searchParams.page === "string" ? searchParams.page : "1";
  // 【1】最新投稿写真一覧に使用するデータ
  const { photos, pagination } = await getPhotos({ page });
  return (
    <>
      <Section>
        <HeadGroup>
          <Heading level={1} size="medium">
            最新投稿
          </Heading>
        </HeadGroup>
        <div className={styles.cardContainer}>
          <PhotoIdsContainer photoIds={photos.map((photo) => photo.id)}>
            {photos.map((photo) => (
              <Link
                key={photo.id}
                href={`/photos/${photo.id}/view`}
                prefetch={true}
              >
                <PhotoCard {...photo} />
              </Link>
            ))}
          </PhotoIdsContainer>
        </div>
      </Section>
      <Pagination
        currentPage={+page}
        pagination={pagination}
        pathname="/"
        prefetch={true}
      />
    </>
  );
}
