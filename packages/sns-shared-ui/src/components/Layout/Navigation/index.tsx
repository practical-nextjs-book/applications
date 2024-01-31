import type { ReactNode } from "react";
import React from "react";
import Link from "next/link";
import { Icon } from "../../Icon";
import styles from "./style.module.css";

type Props = {
  children?: React.ReactNode;
  linkClassName?: string;
  currentPathname: string;
};

export function renderLink(
  flag: boolean,
  renderer: (attr?: { "aria-current": "page" }) => ReactNode,
) {
  return renderer(flag ? { "aria-current": "page" as const } : undefined);
}

export function Navigation({
  children,
  linkClassName,
  currentPathname,
}: Props) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listitem}>
          {renderLink(currentPathname === "/", (attr) => (
            <Link href="/" className={linkClassName} {...attr}>
              <Icon type="home" color={Boolean(attr) ? "orange" : "black"} />
              home
            </Link>
          ))}
        </li>
        <li className={styles.listitem}>
          {renderLink(currentPathname.startsWith("/categories"), (attr) => (
            <Link href="/categories" className={linkClassName} {...attr}>
              <Icon type="photos" color={Boolean(attr) ? "orange" : "black"} />
              categories
            </Link>
          ))}
        </li>
        {children}
      </ul>
    </nav>
  );
}
