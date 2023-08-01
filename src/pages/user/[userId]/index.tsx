import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";

import createSSGHelper from "@/server/ssg-helper";

import { api } from "@/utils/api";

import Header from "@/components/features/header/header";
import { Button } from "@/components/ui/button";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function UserPage(props: Props) {
  const { data } = api.user.getById.useQuery({ userId: props.userId });
  const utils = api.useContext();

  const { mutate } = api.bracket.remove.useMutation({
    async onSuccess() {
      await utils.user.getById.invalidate();
    },
  });

  const handleDeleteBracket = (id: string) => {
    if (!window.confirm("Are you sure?")) return;

    mutate({ bracketId: id });
  };

  if (!data) return <p>User not found...</p>;

  return (
    <>
      <div>
        {data.user.name && (
          <Header
            heading={data.user.name}
            description="You can view your own brackets here"
          />
        )}
      </div>

      {data.user.brackets.map((bracket) => {
        <div key={bracket.id}>
          <h2>{bracket.name}</h2>
          <Button
            variant="destructive"
            onClick={() => handleDeleteBracket(bracket.id)}
          >
            Delete
          </Button>
        </div>;
      })}
    </>
  );
}

// Prefetch user on server

export async function getStaticProps(
  context: GetStaticPropsContext<{ userId: string }>,
) {
  const helpers = createSSGHelper();
  const userId = context.params?.userId as string;

  // prefetch `bracket.getById`
  await helpers.user.getById.prefetch({ userId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      userId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
