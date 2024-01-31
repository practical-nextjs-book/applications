import { getLoginUser } from "@/_mock";
import { getPhotos } from "@/services/getPhotos";
import { MyProfilePhotos } from "../_components/MyProfilePhotos";
import { MyProfileEditPanel } from "./_components/MyProfileEditPanel";

export default async function Page() {
  // 🚧: ログインユーザー取得の仮実装
  const { user, profile } = getLoginUser();
  const { photos } = await getPhotos({ authorId: user.id });
  return (
    <>
      <MyProfileEditPanel user={user} profile={profile} />
      <MyProfilePhotos photos={photos} />
    </>
  );
}
