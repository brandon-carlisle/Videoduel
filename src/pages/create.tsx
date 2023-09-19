import CreateBracketForm from "@/components/features/bracket/create-bracket-form";
import Header from "@/components/features/header/header";

// TODO: Add middleware to protect this page if user in not logged in

export default function CreatePage() {
  return (
    <>
      <Header
        title="Create Bracket"
        description="You can create a bracket here using a valid YouTube playlist link. Please make sure your playlist contains either 8/16/32/64 videos."
      />
      <CreateBracketForm />
    </>
  );
}
