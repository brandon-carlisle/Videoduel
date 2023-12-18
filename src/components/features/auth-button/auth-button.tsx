import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../../ui/button";
import AnimatedLoaderIcon from "../loader-icon/animated-loader-icon";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Button disabled>
        <AnimatedLoaderIcon />
        Sign in
      </Button>
    );

  return (
    <div>
      {session ? (
        <Button variant={"outline"} onClick={() => void signOut()}>
          Sign out
        </Button>
      ) : (
        <Button variant={"outline"} asChild>
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
      )}
    </div>
  );
}
