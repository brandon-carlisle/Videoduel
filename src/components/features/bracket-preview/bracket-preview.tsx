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
        <div className="">
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

        <ul className="col-span-2 space-y-5">
          {bracket.videos.map((video) => {
            return (
              <li
                key={video.id}
                className="border-b-2 border-secondary pb-3 last:border-none"
              >
                {video.thumbnail && video.title && (
                  <Image
                    src={video.thumbnail}
                    width={500}
                    height={500}
                    alt={`Youtube thumbnail for ${video.title}`}
                    className="mb-2 h-auto w-auto"
                  />
                )}
                <h3 className="font-semibold">{video.title}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
