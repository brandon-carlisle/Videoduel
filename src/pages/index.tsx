import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "@/utils/api";

import AuthButton from "@/components/features/auth-button/auth-button";
import Header from "@/components/features/header/header";
import AnimatedLoaderIcon from "@/components/features/loader-icon/animated-loader-icon";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session, status } = useSession();

  const { data } = api.bracket.getFeatured.useQuery();

  if (status === "loading") return <AnimatedLoaderIcon />;

  return (
    <>
      <Header
        title="Vote on Youtube videos"
        description="Create a tournament bracket with just a Youtube playlist or play one of our featured brackets"
      />

      {!session ? (
        <Button onClick={() => void signIn("discord")}>Create bracket</Button>
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
