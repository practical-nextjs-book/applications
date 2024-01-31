import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { Icon } from "../Icon";
import styles from "./style.module.css";

type Props = {
  imageUrl: string;
  title?: string;
  description?: string;
  rounded?: boolean;
  ratio?: "wide" | "square" | "portrait";
  fit?: "cover" | "contain";
  size?: "small" | "medium" | "large";
  actionIcon?: {
    iconProps: React.ComponentProps<typeof Icon>;
    containerProps?: React.ComponentProps<"div">;
  };
  showMeta?: boolean;
  animate?: boolean;
  lineClamp?: 1 | 2 | 3 | 4;
  priority?: boolean;
};

const sizes = {
  large: { width: 960, height: 640 },
  medium: { width: 420, height: 280 },
  small: { width: 180, height: 120 },
};

const disabledNextImage = process.env.NEXT_PUBLIC_DISABLE_NEXT_IMAGE === "true";

export function PhotoCard({
  ratio = "wide",
  fit = "cover",
  size = "medium",
  actionIcon,
  rounded = true,
  showMeta = true,
  animate = true,
  lineClamp = 1,
  priority,
  ...photo
}: Props) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[ratio],
        styles[fit],
        rounded && styles.rounded,
      )}
    >
      {/* Image コンポーネントを使用しない場合の検証用 */}
      {disabledNextImage && (
        <span style={{ backgroundImage: `url(${photo.imageUrl})` }} />
      )}
      {!disabledNextImage && (
        <Image
          src={photo.imageUrl}
          alt={photo.title || ""}
          {...sizes[size]}
          priority={priority}
        />
      )}
      {showMeta && (
        <div className={clsx(styles.meta, animate && styles.animate)}>
          <p className={styles.title}>{photo.title}</p>
          <p
            className={clsx(
              styles.description,
              styles[`lineClamp${lineClamp}`],
            )}
          >
            {photo.description}
          </p>
        </div>
      )}
      {actionIcon && (
        <div
          {...actionIcon.containerProps}
          className={clsx(
            actionIcon.containerProps?.className,
            styles.actionIcon,
            animate && styles.animate,
          )}
        >
          <Icon {...actionIcon.iconProps} />
        </div>
      )}
    </div>
  );
}
