import { ProfilePanel } from "sns-shared-ui/src/components/ProfilePanel";
import { getProfileFromScreenName } from "../../dataFetch";

type Props = {
  screenName: string;
};

export async function UserPanel({ screenName }: Props) {
  const profile = await getProfileFromScreenName(screenName);
  return (
    <ProfilePanel
      imageUrl={profile.user.image}
      name={profile.user.name || ""}
      screenName={profile.screenName || ""}
      bio={profile.bio || ""}
    />
  );
}
