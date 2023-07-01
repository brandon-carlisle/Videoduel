import AnimatedLoaderIcon from "@/components/animated-loader-icon";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <AnimatedLoaderIcon />;

  return (
    <>
      {!session ? (
        <p>Please sign in to create your own bracket</p>
      ) : (
        <p>You can create a bracket here using a valid YouTube playlist link</p>
      )}
    </>
  );
}
