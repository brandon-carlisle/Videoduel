import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </Button>
    );

  return (
    <div>
      {session ? (
        <Button onClick={() => void signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => void signIn("discord")}>Sign In</Button>
      )}
    </div>
  );
}
