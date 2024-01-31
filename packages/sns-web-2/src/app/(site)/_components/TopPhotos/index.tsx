import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Pagination } from "sns-shared-ui/src/components/Pagination";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import type { Photo } from "@/services/type";
import styles from "./style.module.css";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

type Props = {
  photos: Photo[];
  pagination: PaginationProps;
  page: string;
};

export function TopPhotos({ photos, pagination, page }: Props) {
  return (
    <>
      <Section>
        <HeadGroup>
          <Heading level={1} size="medium">
            最新投稿
          </Heading>
        </HeadGroup>
        <div className={styles.cardContainer}>
          {photos.map((photo) => (
            <PhotoViewModalContainer key={photo.id} photo={photo}>
              <PhotoCard {...photo} />
            </PhotoViewModalContainer>
          ))}
        </div>
      </Section>
      <Pagination currentPage={+page} pagination={pagination} pathname="/" />
    </>
  );
}
