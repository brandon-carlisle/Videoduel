import Image from "next/image";
import Link from "next/link";

import AuthButton from "../auth-button/auth-button";
import UserButton from "../user-button/user-button";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="mb-10 flex w-full items-center justify-between">
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Image
            src={"/vote.png"}
            width={1024}
            height={1024}
            alt="vote icon"
            className="h-8 w-8 rounded"
          />
          <div className="text-4xl font-bold">Vote</div>
        </div>
      </Link>
      <div className="flex gap-2">
        <UserButton />
        <AuthButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}
