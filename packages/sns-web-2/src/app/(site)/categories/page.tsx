import Link from "next/link";
import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { getCategories } from "@/services/getCategories";

export default async function Page() {
  // 📌 fetch 関数をラップしたデータ取得関数
  const data = await getCategories();
  return (
    <Section>
      <HeadGroup>
        <Heading level={1} size="medium">
          カテゴリー一覧
        </Heading>
      </HeadGroup>
      {data.categories.length > 0 && (
        <CardContainer>
          {data.categories.map((category) => (
            <Link href={`/categories/${category.name}`} key={category.id}>
              <PhotoCard
                title={category.label}
                description={category.description}
                imageUrl={category.imageUrl}
              />
            </Link>
          ))}
        </CardContainer>
      )}
    </Section>
  );
}
