import React from "react";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Tag } from "../Tag";

type Props = ComponentPropsWithoutRef<typeof Tag> & {
  linkProps: ComponentPropsWithoutRef<typeof Link>;
};

export function LinkTag({ linkProps, ...props }: Props) {
  return (
    <Link {...linkProps}>
      <Tag {...props} />
    </Link>
  );
}
