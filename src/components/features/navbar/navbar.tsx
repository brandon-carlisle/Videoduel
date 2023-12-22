import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import AuthButton from "../auth-button/auth-button";
import UserButton from "../user-button/user-button";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}

function DesktopNav() {
  return (
    <div className="hidden md:block">
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
            <div className="hidden text-4xl font-bold sm:block">Videoduel</div>
          </div>
        </Link>
        <div className="flex gap-2">
          <UserButton />
          <AuthButton />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="block md:hidden">
      <nav className="mb-10 flex w-full items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/vote.png"}
            width={1024}
            height={1024}
            alt="vote icon"
            className="h-8 w-8 rounded"
          />
        </Link>
        <Sheet>
          <SheetTrigger>
            <Menu width={24} height={24} className="border-secondary" />
          </SheetTrigger>
          <SheetContent>
            <div className="flex h-full flex-col items-start justify-between">
              <div className="flex gap-5">
                <UserButton />
                <ThemeToggle />
              </div>
              <div className="mt-auto">
                <AuthButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
