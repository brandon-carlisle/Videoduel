import { type Bracket, type Video } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

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
      <Header
        title={bracket.name || "Could not find bracket name..."}
        description={
          bracket.createdBy.name
            ? `by ${bracket.createdBy.name}`
            : "Could not find username"
        }
      />

      <div>
        <Button asChild>
          <Link href={`/${bracket.id}/play`}>Vote</Link>
        </Button>

        <ul>
          {bracket.videos.map((video) => {
            return (
              <div key={video.id}>
                {video.thumbnail && video.title && (
                  <Image
                    src={video.thumbnail}
                    width={500}
                    height={500}
                    alt={`Youtube thumbnail for ${video.title}`}
                    className="h-auto w-auto"
                  />
                )}
                <h3>{video.title}</h3>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
