import { Info } from "lucide-react";
import { useSession } from "next-auth/react";

import CreateBracketForm from "@/components/features/bracket-form/create-bracket-form";
import Header from "@/components/features/header/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreatePage() {
  const { data: session } = useSession();

  if (!session) return <p>You need to sign in to create a bracket...</p>;

  return (
    <>
      <Header
        title="Create Bracket"
        description="You can create a bracket here using a valid YouTube playlist link."
      />
      <CreateBracketForm />
      <div className="fixed bottom-5 left-0 w-full pl-4 pr-4">
        <Alert className="">
          <Info className="h-4 w-4" />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            Your YouTube playlist must be{" "}
            <span className="font-bold">public</span> and only contain exactly{" "}
            <span className="font-bold">2/4/8/16/32/64</span> videos.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
