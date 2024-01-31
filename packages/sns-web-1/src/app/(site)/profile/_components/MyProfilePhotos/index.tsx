"use client";

import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import type { Photo } from "@/services/type";
import styles from "./style.module.css";

type Props = {
  photos: Photo[];
};
export function MyProfilePhotos({ photos }: Props) {
  return (
    <div className={styles.page}>
      <Section>
        <HeadGroup>
          <Heading level={2} size="medium">
            投稿写真一覧
          </Heading>
        </HeadGroup>
        {photos.length > 0 ? (
          <CardContainer>
            {photos.map((photo) => (
              <PhotoViewModalContainer photo={photo} key={photo.id}>
                <PhotoCard {...photo} />
              </PhotoViewModalContainer>
            ))}
          </CardContainer>
        ) : (
          <Typography>投稿写真がありません</Typography>
        )}
      </Section>
    </div>
  );
}
