"use client";

import { format, parseISO } from "date-fns";
import ja from "date-fns/locale/ja";
import { Account } from "sns-shared-ui/src/components/Account";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { Typography } from "sns-shared-ui/src/components/Typography";
import type { Author, Comment } from "@/services/type";
import styles from "./style.module.css";

type Props = {
  authors: Author[];
  comments: Comment[];
};

export function CommentList({ authors, comments }: Props) {
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
