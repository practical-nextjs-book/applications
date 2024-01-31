import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Pagination } from "sns-shared-ui/src/components/Pagination";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import type { Photo } from "@/services/type";
import { ClientMyProfilePhotos } from "./ClientMyProfilePhotos";
import styles from "./style.module.css";
import type { PaginationProps } from "sns-shared-ui/src/components/Pagination";

type Props = {
  photos: Photo[];
  pagination: PaginationProps;
  page: string;
};
export function MyProfilePhotos({ photos, pagination, page }: Props) {
  return (
    <div className={styles.page}>
      <Section>
        <HeadGroup>
          <Heading level={2} size="medium">
            投稿写真一覧
          </Heading>
        </HeadGroup>
        {photos.length > 0 ? (
          <ClientMyProfilePhotos photos={photos} />
        ) : (
          <Typography>投稿写真がありません</Typography>
        )}
      </Section>
      <Pagination
        currentPage={+page}
        pagination={pagination}
        pathname="/profile"
      />
    </div>
  );
}
