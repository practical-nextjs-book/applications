import { getLoginUser } from "@/_mock";
import { getPhotos } from "@/services/getPhotos";
import { MyProfilePanel } from "./_components/MyProfilePanel";
import { MyProfilePhotos } from "./_components/MyProfilePhotos";

export default async function Page() {
  // 🚧: ログインユーザー取得の仮実装
  const { user, profile } = getLoginUser();
  const { photos } = await getPhotos({ authorId: user.id });
  return (
    <>
      <MyProfilePanel user={user} profile={profile} />
      <MyProfilePhotos photos={photos} />
    </>
  );
}
