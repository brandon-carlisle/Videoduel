import Image from "next/image";
import Link from "next/link";

import { type Bracket, type Video } from "@prisma/client";

import { Button } from "@/components/ui/button";

import Header from "../header/header";

interface ExtendedBracket extends Bracket {
  createdBy: {
    name: string | null;
    image: string | null;
  };
  videos: Video[];
}

interface Props {
  bracket: ExtendedBracket;
}

export default function BracketPreview({ bracket }: Props) {
  return (
    <>
      <div className="grid md:grid-cols-3">
        <div className="mb-5">
          <Header
            title={bracket.name || "Could not find bracket name..."}
            description={
              bracket.createdBy.name
                ? `by ${bracket.createdBy.name}`
                : "Could not find username"
            }
          />

          <Button asChild>
            <Link href={`/${bracket.id}/play`}>Vote on bracket</Link>
          </Button>
        </div>

        <div className="col-span-2 md:max-h-screen md:overflow-scroll">
          <ul className="space-y-5">
            {bracket.videos.map((video, idx) => {
              let winsText = "";

              if (idx === 0) winsText = "🥇";
              if (idx === 1) winsText = "🥈";
              if (idx === 2) winsText = "🥉";

              return (
                <li
                  key={video.id}
                  className="border-b-2 border-secondary pb-3 last:border-none"
                >
                  <div className="flex gap-2">
                    {video.thumbnail && video.title && (
                      <Image
                        src={video.thumbnail}
                        width={500}
                        height={500}
                        alt={`Youtube thumbnail for ${video.title}`}
                        className="mb-2 h-auto w-auto rounded-lg"
                      />
                    )}
                    <div className="p-2">
                      <p className="mb-2 text-xl font-bold">
                        {winsText} {video.wins} votes
                      </p>
                      <p className="font-semibold">{video.title}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
