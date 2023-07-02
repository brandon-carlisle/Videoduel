import AnimatedLoaderIcon from "@/components/animated-loader-icon";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

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
    </>
  );
}
