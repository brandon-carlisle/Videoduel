import { type GetStaticPropsContext, type InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

import createSSGHelper from "@/server/helpers/ssg-helper";

import { api } from "@/utils/api";

import DeleteAccountConfirm from "@/components/features/delete-account/delete-account";
import Header from "@/components/features/header/header";
import AnimatedLoaderIcon from "@/components/features/loader-icon/animated-loader-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function UserPage(props: Props) {
  const { data: session } = useSession();
  const { data } = api.user.getById.useQuery({ userId: props.userId });
  const utils = api.useContext();

  const { mutate, isLoading } = api.bracket.remove.useMutation({
    async onSuccess() {
      await utils.user.getById.invalidate();
    },
  });

  const handleDeleteBracket = (id: string) => {
    if (!confirm("Are you sure?")) return;

    mutate({ bracketId: id });
  };

  if (!data) return <p>User not found...</p>;
  if (isLoading) return <AnimatedLoaderIcon />;

  return (
    <>
      <div>
        {data.user.name && (
          <Header
            title={`${data.user.name}'s brackets`}
            description="You can view your own brackets here"
          />
        )}
      </div>

      <ul className="flex flex-col gap-5">
        {data.user.brackets.length >= 1 ? (
          data.user.brackets.map((bracket) => {
            return (
              <li
                key={bracket.id}
                className="flex items-center justify-between"
              >
                <h2 className="text-lg font-semibold">{bracket.name}</h2>
                <div className="flex gap-2">
                  <div>
                    <Button asChild variant="outline">
                      <Link href={`/bracket/${bracket.id}`}>Vote now</Link>
                    </Button>
                  </div>
                  <div>
                    {bracket.userId === session?.user.id ? (
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteBracket(bracket.id)}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <div>
            <p className="mb-3">No brackets yet...</p>

            <Button asChild>
              <Link href="/create-bracket">Create bracket</Link>
            </Button>
          </div>
        )}
      </ul>

      {session?.user.id === data.user.id ? (
        <>
          <div className="my-5">
            <Separator />
          </div>
          <div>
            <DeleteAccountConfirm />
          </div>
        </>
      ) : null}
    </>
  );
}

// Prefetch user on server

export async function getStaticProps(
  context: GetStaticPropsContext<{ userId: string }>,
) {
  const helpers = createSSGHelper();
  const userId = context.params?.userId as string;

  // prefetch `bracket.getById`
  await helpers.user.getById.prefetch({ userId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      userId,
    },
    revalidate: 1,
  };
}

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
