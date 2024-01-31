export type Photo = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  categoryId: string;
  likedCount: number;
};

export type Category = {
  id: string;
  createdAt: string;
  name: string;
  label: string;
  description: string;
  imageUrl: string;
  photos: Photo[];
};

export type Comment = {
  id: string;
  createdAt: string;
  authorId: string;
  photoId: string;
  comment: string;
};
