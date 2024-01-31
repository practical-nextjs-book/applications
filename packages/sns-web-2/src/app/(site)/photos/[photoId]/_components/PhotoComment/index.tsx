import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";
import type { Photo } from "@/services/type";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

type Props = {
  photo: Photo;
  userId?: string;
};

export function PhotoComment({ photo, userId }: Props) {
  return (
    <div>
      {userId && (
        <Section>
          <HeadGroup>
            <Heading level={3} size="small">
              コメント投稿
            </Heading>
          </HeadGroup>
          <CommentForm photo={photo} />
        </Section>
      )}
      <Section>
        <HeadGroup>
          <Heading level={3} size="small">
            コメント一覧
          </Heading>
        </HeadGroup>
        <CommentList photo={photo} />
      </Section>
    </div>
  );
}
