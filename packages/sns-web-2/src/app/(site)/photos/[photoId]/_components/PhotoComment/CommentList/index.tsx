import { format, parseISO } from "date-fns";
import ja from "date-fns/locale/ja";
import { Account } from "sns-shared-ui/src/components/Account";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { prisma } from "@/lib/prisma";
import { getPhotoComments } from "@/services/getPhotoComments";
import type { Photo } from "@/services/type";
import styles from "./style.module.css";

type Props = {
  photo: Photo;
};

export async function CommentList({ photo }: Props) {
  const { comments } = await getPhotoComments({ id: photo.id });
  const authorIds = Array.from(
    new Set(comments.map((comment) => comment.authorId))
  );
  const authors = await prisma.user.findMany({
    where: { id: { in: authorIds } },
    select: {
      id: true,
      name: true,
      image: true,
      profile: { select: { screenName: true } },
    },
  });
  return comments.length > 0 ? (
    <ul className={styles.list}>
      {comments.map(({ id, authorId, createdAt, comment }) => {
        const author = authors.find((author) => author.id === authorId);
        if (!author) return null;
        const date = format(parseISO(createdAt), "yyyy年MM月dd日 HH:mm:ss", {
          locale: ja,
        });
        return (
          <li key={id} className={styles.listitem}>
            <Account
              name={author.name}
              screenName={author.profile?.screenName}
              imageUrl={author.image}
              avatarSize="small"
            />
            <p className={styles.comment}>{comment}</p>
            <p className={styles.date}>{date}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <div className={styles.noComments}>
      <Icon type="comments" size="large" color="gray" />
      <Typography>コメントはありません</Typography>
    </div>
  );
}
