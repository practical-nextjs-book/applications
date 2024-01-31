import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Pagination } from "sns-shared-ui/src/components/Pagination";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { getPhotos } from "@/services/getPhotos";
import { ClientMyProfilePhotos } from "./ClientMyProfilePhotos";
import styles from "./style.module.css";

type Props = {
  page: string;
  authorId: string;
};
export async function MyProfilePhotos({ page, authorId }: Props) {
  const { photos, pagination } = await getPhotos({
    page,
    take: "15",
    authorId,
  });
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
