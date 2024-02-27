"use client";

import { Accounts } from "sns-shared-ui/src/components/Accounts";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";

type TopUsersProps = {
  users: {
    profile: {
      screenName: string | null;
    } | null;
    id: string;
    name: string | null; // ★: ここに型互換エラーが発生
    image: string | null;
  }[];
};

export function TopUsers({ users }: TopUsersProps) {
  return (
    <Section>
      <HeadGroup>
        <Heading level={2} size="small">
          Users
        </Heading>
      </HeadGroup>
      {users && (
        <Accounts
          users={users
            .filter((user) => Boolean(user.profile?.screenName))
            .map((user) => ({
              id: user.id,
              name: user.name,
              imageUrl: user.image,
              screenName: user.profile?.screenName,
            }))}
        />
      )}
    </Section>
  );
}
