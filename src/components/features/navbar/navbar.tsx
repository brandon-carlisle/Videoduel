import Link from "next/link";

import AuthButton from "../auth-button/auth-button";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="mb-10 flex w-full items-center justify-between">
      <Link href={"/"} className="text-5xl font-bold">
        Vote
      </Link>
      <div className="flex gap-2">
        <AuthButton />
        <ThemeToggle />
      </div>
    </nav>
  );
}
