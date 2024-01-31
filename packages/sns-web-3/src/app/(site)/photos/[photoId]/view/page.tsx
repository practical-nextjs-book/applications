import { redirect } from "next/navigation";

type Props = {
  params: { photoId: string };
};

export default async function Page({ params }: Props) {
  // 📌: Parallel Routes & Intercepting Routes による
  // モーダル表示のみを期待しているため redirect
  redirect(`/photos/${params.photoId}`);
}
