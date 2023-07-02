import AnimatedLoaderIcon from "@/components/animated-loader-icon";
import CreateBracketForm from "@/components/create-bracket";
import Header from "@/components/header";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <AnimatedLoaderIcon />;

  return (
    <>
      {!session ? (
        <p>Please sign in to create your own bracket</p>
      ) : (
        <>
          <Header
            heading="Create Bracket"
            description="You can create a bracket here using a valid YouTube playlist link"
          />

          <CreateBracketForm />
        </>
      )}
    </>
  );
}
