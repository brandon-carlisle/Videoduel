import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";

import createSSGHelper from "@/server/helpers/ssg-helper";

import { api } from "@/utils/api";

import BracketPreview from "@/components/features/bracket-preview/bracket-preview";
import Meta from "@/components/features/meta/meta";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function BracketPage(props: Props) {
  const { data } = api.bracket.getById.useQuery({
    bracketId: props.bracketId,
  });

  if (!data) return <p>No bracket found...</p>;

  const { bracket } = data;

  return (
    <>
      <Meta title={`${bracket.name} | Videoduel`} />

      <BracketPreview bracket={bracket} />
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
