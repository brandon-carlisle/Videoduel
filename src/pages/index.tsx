import { useSession } from "next-auth/react";
import Link from "next/link";

import FeaturedBrackets from "@/components/features/bracket-featured-grid/featured-brackets";
import Header from "@/components/features/header/header";
import Meta from "@/components/features/meta/meta";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <>
      <Meta title="Videoduel" />
      <Header
        title="Vote on Youtube videos"
        description="Create a tournament bracket with just a Youtube playlist or play a featured bracket"
      />

      <div className="mb-16">
        {!session ? (
          <Button variant={"secondary"} asChild>
            <Link href={"/sign-in"}>Sign in to create</Link>
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

      <div className="hidden md:block">
        <footer className="fixed bottom-0 left-1/2 flex w-full  -translate-x-1/2 items-center justify-center py-4">
          <div className="flex">
            <Button asChild variant={"link"}>
              <a
                href="https://github.com/brandon-carlisle/videoduel"
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>
            </Button>

            <Button asChild variant={"link"}>
              <Link href={"/policy"}>Policy</Link>
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}
