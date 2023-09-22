import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import FeaturedBrackets from "@/components/features/bracket-featured-grid/featured-brackets";
import Header from "@/components/features/header/header";
import AnimatedLoaderIcon from "@/components/features/loader-icon/animated-loader-icon";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <AnimatedLoaderIcon />;

  return (
    <>
      <Header
        title="Vote on Youtube videos"
        description="Create a tournament bracket with just a Youtube playlist or play one of our featured brackets"
      />

      <div className="mb-16">
        {!session ? (
          <Button onClick={() => void signIn("discord")}>Create bracket</Button>
        ) : (
          <Button asChild>
            <Link href="/create">Create bracket</Link>
          </Button>
        )}
      </div>

      <section>
        <h2 className="mb-8 text-xl font-semibold">Featured brackets</h2>
        <FeaturedBrackets />
      </section>
    </>
  );
}
