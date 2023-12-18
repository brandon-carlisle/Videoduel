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
        description="Create a tournament bracket with just a Youtube playlist or play a featured bracket"
      />

      <div className="mb-16">
        {!session ? (
          <Button onClick={() => void signIn("discord")} variant={"secondary"}>
            Sign in to create
          </Button>
        ) : (
          <Button asChild>
            <Link href="/create-bracket">Create bracket</Link>
          </Button>
        )}
      </div>

      <section>
        <h2 className="mb-8 text-xl font-semibold">Featured brackets</h2>
        <FeaturedBrackets />
      </section>

      <footer className="fixed bottom-0 left-1/2 flex w-full  -translate-x-1/2 items-center justify-center py-4">
        <div className="flex">
          <Button asChild variant={"link"}>
            <a
              href="https://github.com/brandon-carlisle/StadiumGuessr"
              target="_blank"
              rel="noreferrer"
            >
              Source code
            </a>
          </Button>

          <Button asChild variant={"link"}>
            <Link href={"/policy"}>Policy</Link>
          </Button>
        </div>
      </footer>
    </>
  );
}
