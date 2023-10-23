import { type Bracket, type Video } from "@prisma/client";
import { useEffect, useState } from "react";

import { generateMatchups } from "@/utils/matchups/matchup";
import { type Matchup } from "@/utils/matchups/types";

import { Button } from "@/components/ui/button";

import { EmptyPlayer, YoutubePlayer } from "./youtube-player";

interface ExtendedBracket extends Bracket {
  videos: Video[];
}

interface Props {
  bracket: ExtendedBracket;
}

export default function VoteGameNew({ bracket }: Props) {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const newMatchups = generateMatchups(bracket.videos);
    setMatchups(newMatchups);
    setCurrentMatchupIndex(0); // Initialize to the first matchup
  }, [bracket.videos]);

  const handleVote = (video) => {
    setSelectedVideo(video);
    setIsZooming(true);

    // After a delay, move on to the next matchup
    setTimeout(() => {
      // Logic to move to the next matchup
      setIsZooming(false);
      // Call a function to select the next matchup
    }, 2000); // Adjust the delay as needed
  };

  // Get the current matchup from the list
  const currentMatchup = matchups[currentMatchupIndex] || null;

  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-6">
      <div className="grid grid-cols-1 place-items-center gap-3 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3">
          {currentMatchup?.a ? (
            <div
              className={
                selectedVideo === currentMatchup.a && isZooming ? "zoom-in" : ""
              }
            >
              <div className="flex flex-col gap-3">
                <YoutubePlayer id={currentMatchup.a.videoId} />
                <p>{currentMatchup.a.videoId}</p>

                <Button onClick={() => handleVote(currentMatchup.a)}>
                  Vote A
                </Button>
              </div>
            </div>
          ) : (
            <EmptyPlayer />
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          {currentMatchup?.b ? (
            <div
              className={
                selectedVideo === currentMatchup.b && isZooming ? "zoom-in" : ""
              }
            >
              <div className="flex flex-col gap-3">
                <YoutubePlayer id={currentMatchup.b.videoId} />
                <p>{currentMatchup.b.videoId}</p>

                <Button onClick={() => handleVote(currentMatchup.b)}>
                  Vote B
                </Button>
              </div>
            </div>
          ) : (
            <EmptyPlayer />
          )}
        </div>
      </div>
    </div>
  );
}
