import React from "react";
import Link from "next/link";
import { Account } from "../Account";
import styles from "./style.module.css";

type Props = {
  users: {
    id: string;
    name?: string | null;
    imageUrl?: string | null;
    screenName?: string | null;
  }[];
};

export function Accounts({ users }: Props) {
  return (
    <div className={styles.accounts}>
      {users.map(({ id, ...user }) => (
        <Link
          key={id}
          className={styles.user}
          href={`/users/${user.screenName}`}
        >
          <Account {...user} />
        </Link>
      ))}
    </div>
  );
}
