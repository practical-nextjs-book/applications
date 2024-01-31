import "sns-shared-ui/src/globals.css";
import { SITE_NAME } from "@/constants";

export const metadata = {
  title: SITE_NAME,
  description:
    "「Photo Share」は、ユーザーが自由に写真を共有し、コメントや「いいね」を通じて交流することができるSNSアプリケーションです。",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
