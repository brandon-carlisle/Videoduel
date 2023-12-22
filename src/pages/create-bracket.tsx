import { HelpCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import CreateBracketForm from "@/components/features/bracket-form/create-bracket-form";
import Header from "@/components/features/header/header";
import Meta from "@/components/features/meta/meta";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function CreatePage() {
  const { data: session } = useSession();

  if (!session) return <p>You need to sign in to create a bracket...</p>;

  return (
    <>
      <Meta title="Create | Videoduel" />

      <Header
        title="Create Bracket"
        description="You can create a bracket here using a valid YouTube playlist link."
      />
      <CreateBracketForm />

      <div className="mt-4">
        <Drawer>
          <DrawerTrigger>
            <HelpCircle />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>What is a valid playlist?</DrawerTitle>
              <DrawerDescription>
                Your YouTube playlist should be set to{" "}
                <span className="font-bold">public</span> and include{" "}
                <span className="font-bold">
                  exactly 2, 4, 8, 16, 32, or 64
                </span>{" "}
                videos.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
