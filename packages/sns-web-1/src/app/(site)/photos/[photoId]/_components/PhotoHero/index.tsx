"use client";

import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import type { Photo } from "@/services/type";

type Props = {
  photo: Photo;
};

export function PhotoHero({ photo }: Props) {
  return (
    <Section>
      <HeadGroup>
        <Heading level={2} size="medium">
          {photo.title}
        </Heading>
      </HeadGroup>
      <PhotoViewModalContainer photo={photo}>
        <PhotoCard
          {...photo}
          size="large"
          showMeta={false}
          actionIcon={{
            iconProps: { type: "zoom", color: "gray" },
          }}
        />
      </PhotoViewModalContainer>
    </Section>
  );
}
