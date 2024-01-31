import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { SITE_NAME } from "@/constants";
import styles from "./style.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `運営企業 | ${SITE_NAME}`,
  description: "運営企業「テックピクチャーズ株式会社」の会社概要",
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Section>
        <Heading level={1} size="large">
          企業概要
        </Heading>
        <Typography tag="p">
          この会社概要は、Chat GPT により生成した、架空の情報です。
        </Typography>
        <ul className={styles.list}>
          <Typography tag="li">
            会社名：テックピクチャーズ株式会社（TechPictures Inc.）
          </Typography>
          <Typography tag="li">
            本社所在地：東京都中央区銀座1-1-1 グローバルビジネスビル18F
          </Typography>
          <Typography tag="li">
            設立：2022年6月1日 代表者：代表取締役社長 山田 太郎
          </Typography>
          <Typography tag="li">従業員数：50名（2023年7月現在）</Typography>
          <Typography tag="li">
            主な事業内容：写真投稿型SNSアプリ「Photo Share」の開発・運営
          </Typography>
        </ul>
      </Section>
      <Section>
        <Heading level={2} size="large">
          私たちのミッション
        </Heading>
        <Typography tag="p">
          テックピクチャーズ株式会社は、2022年に設立されたスタートアップ企業です。
          私たちは写真投稿型のソーシャルネットワーキングサービス（SNS）アプリケーション「Photo
          Share」を開発・運営しております。 「Photo
          Share」は、ユーザーが自由に写真を共有し、コメントや「いいね」を通じて交流することができるSNSアプリケーションです。
        </Typography>
        <Typography tag="p">
          私たちは、「Photo
          Share」を通じて、ユーザーが自身の価値観を写真という形で共有し、その多様性を享受し合うコミュニティの創出を目指しています。
          また、写真には個々のユーザーの視点や感情、記憶が込められており、それらを通じてユーザー同士が深いコミュニケーションを持つことを可能にすることを目指しています。
        </Typography>
        <Typography tag="p">
          テックピクチャーズ株式会社の基盤となるのは、ユーザー一人ひとりの声を大切にし、そのニーズに対応したサービスを提供するという思いです。
          私たちはユーザーの満足度を第一に考え、アプリケーションの使いやすさやデザイン、セキュリティについても、常に最高のものを提供するよう努めています。
        </Typography>
        <Typography tag="p">
          私たちは、テクノロジーの力で人々のコミュニケーションの可能性を広げ、新たな社会的価値を創造することを追求しています。
          そのために、テックピクチャーズでは、新たなアイデアを大切にし、常に技術革新に挑戦しています。
        </Typography>
        <Typography tag="p">
          私たちはこれからも、ユーザーの皆様と共に「Photo
          Share」を成長させていくことを誓い、
          最高のサービス提供に全力で取り組んでまいります。
        </Typography>
      </Section>
    </div>
  );
}
