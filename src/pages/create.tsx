import CreateBracketForm from "@/components/features/bracket/create-bracket-wizard";
import Header from "@/components/features/header/header";

// TODO: Add middleware to protect this page if user in not logged in

export default function CreatePage() {
  return (
    <>
      <Header
        heading="Create Bracket"
        description="You can create a bracket here using a valid YouTube playlist link"
      />
      <CreateBracketForm />
    </>
  );
}
