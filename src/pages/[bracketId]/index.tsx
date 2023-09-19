import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";
import { useState } from "react";

import createSSGHelper from "@/server/helpers/ssg-helper";

import { api } from "@/utils/api";

import BracketPreview from "@/components/features/bracket-preview/bracket-preview";
import VoteGame from "@/components/features/vote/vote-game";
import { Button } from "@/components/ui/button";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function BracketPage(props: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

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
      {!isPlaying && (
        <>
          <Button className="mb-10" onClick={() => setIsPlaying(!isPlaying)}>
            Vote now
          </Button>

          <BracketPreview bracket={bracket} />
        </>
      )}

      {isPlaying && <VoteGame bracket={bracket} />}
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ bracketId: string }>,
) {
  // const helpers = createServerSideHelpers({
  //   router: appRouter,
  //   ctx: {
  //     session: null,
  //     prisma,
  //   },
  //   transformer: superjson, // optional - adds superjson serialization
  // });

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
