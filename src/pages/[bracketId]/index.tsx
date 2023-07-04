// TODO: This data should not be fetched on every req, we can SSG, then create actual bracket on client
import { useRouter } from "next/router";

import { api } from "@/utils/api";

import AnimatedLoaderIcon from "@/components/features/loader-icon/animated-loader-icon";

export default function BracketPage() {
  const router = useRouter();
  const { bracketId } = router.query;

  if (typeof bracketId !== "string")
    return <p>Error getting query string...</p>;

  const { data, isLoading } = api.bracket.getById.useQuery({ bracketId });

  if (isLoading) return <AnimatedLoaderIcon />;

  if (!data) return <p>Could not find that :(</p>;

  return <div>{JSON.stringify(data)}</div>;
}
