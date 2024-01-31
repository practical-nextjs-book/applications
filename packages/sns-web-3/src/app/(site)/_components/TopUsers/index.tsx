import { Accounts } from "sns-shared-ui/src/components/Accounts";
import { HeadGroup } from "sns-shared-ui/src/components/HeadGroup";
import { Heading } from "sns-shared-ui/src/components/Heading";
import { Section } from "sns-shared-ui/src/components/Section";
import { prisma } from "@/lib/prisma";

export async function TopUsers() {
  // 【3】ユーザー一覧に使用するデータ
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      profile: { select: { screenName: true } },
    },
  });
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
