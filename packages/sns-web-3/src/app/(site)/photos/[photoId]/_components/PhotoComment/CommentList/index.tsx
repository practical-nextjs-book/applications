import clsx from "clsx";
import { format, parseISO } from "date-fns";
import ja from "date-fns/locale/ja";
import { Account } from "sns-shared-ui/src/components/Account";
import { Icon } from "sns-shared-ui/src/components/Icon";
import { Typography } from "sns-shared-ui/src/components/Typography";
import type { Comment } from "@/services/type";
import styles from "./style.module.css";

type Props = {
  comments: (Comment & { sending?: boolean })[];
  authors: {
    profile: {
      screenName: string | null;
    } | null;
    id: string;
    name: string | null;
    image: string | null;
  }[];
};

export function CommentList({ comments, authors }: Props) {
  return comments.length > 0 ? (
    <ul className={styles.list}>
      {comments.map(({ id, authorId, createdAt, comment, sending }) => {
        const author = authors.find((author) => author.id === authorId);
        if (!author) return null;
        const date = format(parseISO(createdAt), "yyyy年MM月dd日 HH:mm:ss", {
          locale: ja,
        });
        return (
          <li
            key={id}
            className={clsx(styles.listitem, sending && styles.sending)}
          >
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
