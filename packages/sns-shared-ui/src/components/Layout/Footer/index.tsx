import React from "react";
import Link from "next/link";
import { Typography } from "../../Typography";
import styles from "./style.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography size="small" className={styles.copyright}>
        © Photo Share. All rights reserved.
      </Typography>
      <ul className={styles.list}>
        <li className={styles.listitem}>
          <Link href="/privacy-policy">プライバシー・ポリシー</Link>
        </li>
        <li className={styles.listitem}>
          <Link href="/company-info">運営企業</Link>
        </li>
      </ul>
    </footer>
  );
}
