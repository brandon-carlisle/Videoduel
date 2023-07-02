import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../../ui/button";
import AnimatedLoaderIcon from "../loader-icon/animated-loader-icon";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Button disabled>
        <AnimatedLoaderIcon />
        Loading
      </Button>
    );

  return (
    <div>
      {session ? (
        <Button variant={"outline"} onClick={() => void signOut()}>
          Sign out
        </Button>
      ) : (
        <Button variant={"outline"} onClick={() => void signIn("discord")}>
          Sign In
        </Button>
      )}
    </div>
  );
}
