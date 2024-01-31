import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";
import { Typography } from "sns-shared-ui/src/components/Typography";
import { SITE_NAME } from "@/constants";
import styles from "./style.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${SITE_NAME}`,
  description: "運営企業「テックピクチャーズ株式会社」のプライバシーポリシー",
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Heading level={1} size="large">
        利用規約
      </Heading>
      <Section>
        <Typography tag="p">
          本規約は、Chat GPT により生成した、架空のサービス規約です。
        </Typography>
        <Heading level={2}>第1条（適用）</Heading>
        <Typography tag="p">
          本規約は、当社が提供する写真投稿型SNSアプリケーション（以下「本サービス」という。）の利用条件を定めるものです。本サービスをご利用いただくすべてのお客さま（以下「ユーザー」という。）に適用されます。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第2条（同意）</Heading>
        <Typography tag="p">
          ユーザーは、本規約に同意した上で、本サービスを利用するものとします。本サービスを利用した時点で、本規約に同意したものとみなします。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第3条（利用登録）</Heading>
        <Typography tag="p">
          ユーザーは、当社の定める登録手続きを行い、利用登録をするものとします。当社は、登録手続きを行った者をユーザーとして扱うことができます。
        </Typography>
        <Typography tag="p">
          当社は、以下の場合には、利用登録を拒否することができます。
        </Typography>
        <ul className={styles.list}>
          <Typography tag="li">登録内容に虚偽、誤記、省略がある場合</Typography>
          <Typography tag="li">
            当社が指定する年齢未満の者が申し込みをした場合
          </Typography>
          <Typography tag="li">
            過去に本サービスの利用を停止された者が申し込みをした場合
          </Typography>
          <Typography tag="li">その他、当社が不適切と判断した場合</Typography>
        </ul>
      </Section>
      <Section>
        <Heading level={2}>第4条（ユーザーIDおよびパスワードの管理）</Heading>
        <Typography tag="p">
          ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを管理するものとします。
        </Typography>
        <Typography tag="p">
          ユーザーは、いかなる場合でも、ユーザーIDおよびパスワードを第三者に利用させることはできません。ユーザーIDおよびパスワードの管理不十分、使用上の過誤、第三者の使用等による損害はユーザー自身の責任とします。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第5条（禁止事項）</Heading>
        <Typography tag="p">
          当社は、ユーザーに対し、以下の行為を禁止します。
        </Typography>
        <ul className={styles.list}>
          <Typography tag="li">法令または公序良俗に違反する行為</Typography>
          <Typography tag="li">犯罪行為に関連する行為</Typography>
          <Typography tag="li">
            当社のサーバーやネットワークの機能を破壊したり、妨害したりする行為
          </Typography>
          <Typography tag="li">
            当社のサービスを利用して不正行為をすること
          </Typography>
          <Typography tag="li">
            他のユーザーに対する威嚇や誹謗中傷、またはプライバシーを侵害する行為
          </Typography>
          <Typography tag="li">他のユーザーに成りすます行為</Typography>
          <Typography tag="li">
            他人の著作権、商標権、プライバシー権、名誉権等を侵害する行為
          </Typography>
          <Typography tag="li">
            商業的な広告、宣伝、勧誘行為（当社が認めたものを除く）
          </Typography>
          <Typography tag="li">
            性行為や暴力行為を描写した画像や文言を投稿、または伝播する行為
          </Typography>
          <Typography tag="li">その他、当社が不適切と判断する行為</Typography>
        </ul>
      </Section>
      <Section>
        <Heading level={2}>第6条（本サービスの提供の停止等）</Heading>
        <Typography tag="p">
          当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく、本サービスの全体または一部の提供を停止または中断することができます。
        </Typography>
        <ul className={styles.list}>
          <Typography tag="li">
            本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
          </Typography>
          <Typography tag="li">
            地震、落雷、火災、風水害、停電または公害等の非常事態により、本サービスの提供が困難となった場合
          </Typography>
          <Typography tag="li">
            コンピュータまたは通信回線等が事故により停止した場合
          </Typography>
          <Typography tag="li">
            その他、当社が本サービスの提供が困難と判断した場合
          </Typography>
        </ul>
      </Section>
      <Section>
        <Heading level={2}>第7条（著作権）</Heading>
        <Typography tag="p">
          ユーザーが本サービスを利用して投稿した写真等の著作権は、投稿者自身またはその他の既存の著作権者に帰属します。
        </Typography>
        <Typography tag="p">
          ユーザーは、自身が投稿するすべてのコンテンツについて、自己が著作権等の必要な権利を有していることを保証するものとします。
        </Typography>
        <Typography tag="p">
          ユーザーは、自身が本サービスに投稿したコンテンツを、当社が商用・非商用を問わず、無償で利用（複製、修正、公開、翻訳など）することを非独占的に許諾するものとします。ただし、この利用は本サービスの提供、運営、広告、宣伝に限定されます。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第8条（利用制限及び登録抹消）</Heading>
        <Typography tag="p">
          当社は、以下の場合には、事前の通知なしに、ユーザーに対して本サービスの利用を制限し、またはユーザーとしての登録を抹消することができます。
        </Typography>
        <ul className={styles.list}>
          <Typography tag="li">本規約のいずれかの条項に違反した場合</Typography>
          <Typography tag="li">
            登録内容に虚偽があることが判明した場合
          </Typography>
          <Typography tag="li">支払い遅延等がある場合</Typography>
          <Typography tag="li">
            その他、当社が本サービスの利用を適当でないと判断した場合
          </Typography>
        </ul>
      </Section>
      <Section>
        <Heading level={2}>第9条（保証の否認及び免責事項）</Heading>
        <Typography tag="p">
          当社は、本サービスに関して、特定の目的への適合性、完全性、信頼性、有用性、または不違反性等について、明示または黙示を問わず一切保証しません。
        </Typography>
        <Typography tag="p">
          当社は、本サービスに起因してユーザーに生じたあらゆる直接的及び間接的損害について一切の責任を負わないものとします。
        </Typography>
        <Typography tag="p">
          当社は、ユーザー間またはユーザーと第三者間のトラブルについて一切の責任を負わないものとします。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第10条（サービス内容の変更等）</Heading>
        <Typography tag="p">
          当社は、ユーザーに通知することなく、本サービスの内容を変更し、または本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負わないものとします。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第11条（利用規約の変更）</Heading>
        <Typography tag="p">
          当社は、必要と認めた場合には、ユーザーに通知することなく、本規約を変更することができるものとします。変更後の規約は、本ウェブサイト上に掲載した時点で効力を生じるものとします。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第12条（通知または連絡）</Heading>
        <Typography tag="p">
          ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は,ユーザーから、当社が定める形式に従った変更届け出がない限り、現在登録されている連絡先を用いて通知または連絡を行うものとします。
        </Typography>
      </Section>
      <Section>
        <Heading level={2}>第13条（準拠法・裁判管轄）</Heading>
        <Typography tag="p">
          本規約の解釈にあたっては、日本法を準拠法とします。
        </Typography>
        <Typography tag="p">
          本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
        </Typography>
      </Section>
      <Typography tag="p">以上</Typography>
    </div>
  );
}
