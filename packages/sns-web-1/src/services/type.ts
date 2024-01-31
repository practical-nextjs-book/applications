export type Photo = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorId: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
  label: string;
  description: string;
  imageUrl: string;
};

export type Comment = {
  id: string;
  authorId: string;
  photoId: string;
  comment: string;
  createdAt: string;
};

export type User = {
  id: string;
  name?: string | null;
  image?: string | null;
  profileId?: string | null;
};

export type Author = User;

export type Profile = {
  id: string;
  bio?: string | null;
  screenName?: string | null;
  userId: string;
};
