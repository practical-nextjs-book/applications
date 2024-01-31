import React from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Heading } from "../Heading";
import { Typography } from "../Typography";
import styles from "./style.module.css";

type Props = {
  imageUrl?: string | null;
  name: string;
  screenName: string;
  bio: string;
  children?: ReactNode;
};

export function ProfilePanel({
  imageUrl,
  name,
  screenName,
  bio,
  children,
}: Props) {
  return (
    <div className={styles.module}>
      <div className={styles.photo}>
        <Image
          src={imageUrl || "/images/account.svg"}
          width={196}
          height={196}
          alt={name || ""}
        />
      </div>
      <div className={styles.meta}>
        <div>
          <Heading level={1}>{name}</Heading>
          <Heading level={2} size="small">
            @{screenName}
          </Heading>
        </div>
        <div className={styles.bio}>
          <Typography>{bio}</Typography>
        </div>
        {children}
      </div>
    </div>
  );
}
