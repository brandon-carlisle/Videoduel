import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";
import { useState } from "react";
import superjson from "superjson";

import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

import { api } from "@/utils/api";

import Header from "@/components/features/header/header";
import VoteGame from "@/components/features/vote/vote-game";
import { Button } from "@/components/ui/button";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function BracketPage(props: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { data } = api.bracket.getById.useQuery({
    bracketId: props.bracketId,
  });

  if (!data) return <p>No bracket found...</p>;

  const { bracket } = data;

  return (
    <>
      <Header
        heading={bracket.name || "Could not find bracket name..."}
        description={
          bracket.createdBy.name
            ? `${bracket.createdBy.name}`
            : "Could not find username"
        }
      />

      {!isPlaying && (
        <>
          <Button className="mb-10" onClick={() => setIsPlaying(!isPlaying)}>
            Vote now
          </Button>

          <div>
            {bracket.videos.map((video) => (
              <div key={video.id}>{video.videoId}</div>
            ))}
          </div>
        </>
      )}

      {isPlaying && <VoteGame bracket={bracket} />}
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ bracketId: string }>,
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma,
    },
    transformer: superjson, // optional - adds superjson serialization
  });
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
