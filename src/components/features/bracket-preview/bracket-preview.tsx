import { type Bracket, type Video } from "@prisma/client";
import Image from "next/image";

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
        heading={bracket.name || "Could not find bracket name..."}
        description={
          bracket.createdBy.name
            ? `${bracket.createdBy.name}`
            : "Could not find username"
        }
      />

      <div>
        <ul>
          {bracket.videos.map((video) => {
            return (
              <div key={video.id}>
                <h3>{video.title}</h3>

                {video.thumbnail && video.title && (
                  <Image
                    src={video.thumbnail}
                    width={500}
                    height={500}
                    alt={`Youtube thumbnail for ${video.title}`}
                  />
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
