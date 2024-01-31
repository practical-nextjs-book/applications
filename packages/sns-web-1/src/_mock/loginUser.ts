import type { Profile, User } from "@/services/type";

export function getLoginUser() {
  const profile: Profile = {
    id: "000",
    screenName: "test-user",
    bio: "test-user の自己紹介文",
    userId: "0",
  };
  const user: User = {
    id: "0",
    name: "テストユーザー",
    profileId: "000",
  };
  return { profile, user };
}
