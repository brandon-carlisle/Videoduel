import CreateBracketForm from "@/components/create-bracket-wizard";
import Header from "@/components/header";

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
