import { useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "@/utils/api";

import AnimatedLoaderIcon from "@/components/features/loader-icon/animated-loader-icon";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session, status } = useSession();

  const { data } = api.bracket.getFeatured.useQuery();

  if (status === "loading") return <AnimatedLoaderIcon />;

  return (
    <>
      {!session ? (
        <p>Please sign in to create your own bracket</p>
      ) : (
        <Button asChild>
          <Link href="/create">Create bracket</Link>
        </Button>
      )}

      <div className="mt-16">
        {data &&
          data.featured.map((bracket) => (
            <div key={bracket.id}>
              <h2 className="mb-3">{bracket.name}</h2>
              <Button asChild variant="outline">
                <Link href={`/${bracket.id}`}>Vote now</Link>
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}
