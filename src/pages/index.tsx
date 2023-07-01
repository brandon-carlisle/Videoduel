import AuthButton from "@/components/auth-button";

import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <AuthButton />

      {session ? (
        <div>Signed in as {session.user.name}</div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
