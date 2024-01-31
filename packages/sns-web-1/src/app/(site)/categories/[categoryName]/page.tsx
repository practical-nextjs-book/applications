import { CardContainer } from "sns-shared-ui/src/components/CardContainer";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { PhotoCard } from "sns-shared-ui/src/components/PhotoCard";
import { Section } from "sns-shared-ui/src/components/Section";
import { PhotoViewModalContainer } from "@/app/_components/PhotoViewModalContainer";
import { getCategory } from "@/services/getCategory";
import { getPhotos } from "@/services/getPhotos";
import styles from "./style.module.css";

type Props = {
  params: { categoryName: string };
};

export default async function Page({ params }: Props) {
  const { category } = await getCategory({ categoryName: params.categoryName });
  const { photos } = await getPhotos({});
  const categoryPhotos = photos.filter(
    (photo) => photo.categoryId === category.id,
  );
  return (
    <div className={styles.page}>
      <Section>
        <HeadGroup>
          <Heading level={1} size="medium">
            {category.label}
          </Heading>
        </HeadGroup>
        {categoryPhotos.length > 0 && (
          <CardContainer>
            {categoryPhotos.map((photo) => (
              <PhotoViewModalContainer key={photo.id} photo={photo}>
                <PhotoCard {...photo} />
              </PhotoViewModalContainer>
            ))}
          </CardContainer>
        )}
      </Section>
    </div>
  );
}
