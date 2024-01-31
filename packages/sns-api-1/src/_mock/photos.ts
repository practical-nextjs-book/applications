import type { Photo } from ".";

export const photos: Photo[] = [...new Array(10)].map((_, i) => {
  const id = `00${i + 1}`.slice(-3);
  const authorId = `${(i % 3) + 1}`;
  return {
    id,
    title: `Test-${id}`,
    description: `Test-${id} description...`.repeat(10),
    imageUrl: "/images/no-image.jpg",
    authorId,
    categoryId: `${(i % 3) + 1}`,
  };
});
