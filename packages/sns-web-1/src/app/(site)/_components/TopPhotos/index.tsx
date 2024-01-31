"use client";

import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import type { Photo } from "@/services/type";
import styles from "./style.module.css";

type Props = {
  photos: Photo[];
};

export function TopPhotos({ photos }: Props) {
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
    </>
  );
}
