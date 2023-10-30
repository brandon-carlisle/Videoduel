import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";

import createSSGHelper from "@/server/helpers/ssg-helper";

import { api } from "@/utils/api";

import VoteGame from "@/components/features/game/vote-game";
import Header from "@/components/features/header/header";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function BracketPage(props: Props) {
  const { data } = api.bracket.getById.useQuery(
    {
      bracketId: props.bracketId,
    },
    { refetchOnWindowFocus: false },
  );

  if (!data) return <p>No bracket found...</p>;

  const { bracket } = data;

  return (
    <>
      <Header title={bracket.name} description="" />
      <VoteGame bracket={bracket} />
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ bracketId: string }>,
) {
  // Move ssg helper into seperate func
  const helpers = createSSGHelper();

  const bracketId = context.params?.bracketId as string;

  // prefetch `bracket.getById`
  await helpers.bracket.getById.prefetch({ bracketId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      bracketId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
