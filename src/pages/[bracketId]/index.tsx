import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import superjson from "superjson";

import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";

import { api } from "@/utils/api";
import { generateMatchups } from "@/utils/matchup";

import Header from "@/components/features/header/header";

export default function BracketPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { data } = api.bracket.getById.useQuery({
    bracketId: props.bracketId,
  });

  useEffect(() => generateMatchups(example), []);

  if (!data) return <p>No bracket found...</p>;

  const { bracket } = data;

  return (
    <Header
      heading={bracket.name || "Could not find bracket name..."}
      description={
        bracket.createdBy.name
          ? `${bracket.createdBy.name}`
          : "Could not find username"
      }
    />
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

const example = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
];
