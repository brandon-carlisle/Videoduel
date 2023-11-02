import { useSession } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div>
      <Link href={`/user/${session.user.id}`}>
        <Avatar>
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
