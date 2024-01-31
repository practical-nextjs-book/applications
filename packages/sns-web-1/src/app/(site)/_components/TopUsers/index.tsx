"use client";

import { Accounts } from "sns-shared-ui/src/components/Accounts";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";
import type { Profile, User } from "@/services/type";

type Props = {
  users: User[];
  profiles: Profile[];
};

export function TopUsers({ users, profiles }: Props) {
  return (
    <Section>
      <HeadGroup>
        <Heading level={2} size="small">
          Users
        </Heading>
      </HeadGroup>
      {users && (
        <Accounts
          users={users.map((user) => ({
            id: user.id,
            name: user.name,
            imageUrl: user.image,
            screenName: profiles.find((profile) => profile.userId === user.id)
              ?.screenName,
          }))}
        />
      )}
    </Section>
  );
}
