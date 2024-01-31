import { Heading } from "../Heading";
import { LinkButton } from "../LinkButton";
import { Typography } from "../Typography";
import styles from "./style.module.css";

export function NotFound() {
  return (
    <div className={styles.module}>
      <div className={styles.message}>
        <Heading level={1}>Not Found</Heading>
        <Typography>お探しのページは見つかりませんでした</Typography>
      </div>
      <p>
        <LinkButton href="/" color="gray">
          TOP へ戻る
        </LinkButton>
      </p>
    </div>
  );
}
