import React from "react";
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import type { PaginationProps } from "./pagination";

function isCurrent(
  a: number,
  b: number,
): AnchorHTMLAttributes<HTMLAnchorElement> {
  return {
    "aria-current": (a == 0 && b == 1) || a == b ? "page" : undefined,
  };
}

export const Pagination = ({
  currentPage,
  pathname,
  pagination,
  prefetch,
  separator = "?page=",
}: {
  currentPage: number;
  pathname: string;
  pagination: PaginationProps;
  prefetch?: boolean;
  separator?: string;
}) => {
  if (!pagination) return null;
  return (
    <nav aria-label="ページネーション">
      <ul className={styles.pagination}>
        {pagination.prev && (
          <li className={styles.prev}>
            <Link
              href={`${pathname}${separator}${pagination.prev}`}
              prefetch={prefetch}
              aria-label="前のページへ"
            />
          </li>
        )}
        {pagination?.items.map((item, index) => (
          <li key={index}>
            {typeof item === "number" ? (
              <Link
                href={`${pathname}${separator}${item}`}
                prefetch={prefetch}
                {...isCurrent(currentPage, item)}
              >
                {item.toString()}
              </Link>
            ) : (
              <span>{item.toString()}</span>
            )}
          </li>
        ))}
        {pagination.next && (
          <li className={styles.next}>
            <Link
              href={`${pathname}${separator}${pagination.next}`}
              prefetch={prefetch}
              aria-label="次のページへ"
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export type { PaginationProps };
