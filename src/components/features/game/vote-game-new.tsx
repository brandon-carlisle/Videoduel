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

  const [selectedVideo, setSelectedVideo] = useState<Video>();
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const newMatchups = generateMatchups(bracket.videos);
    setMatchups(newMatchups);
    setCurrentMatchupIndex(0); // Initialize to the first matchup
  }, [bracket.videos]);

  const handleVote = (video: Video) => {
    setSelectedVideo(video);
    setIsZooming(true);

    // Delay to allow time for the zoom-in animation
    setTimeout(() => {
      setTimeout(() => {
        handleNextMatchup();
        setIsZooming(false);
      }, 3000);
    }, 2000);
  };

  const handleNextMatchup = () => {
    if (currentMatchupIndex < matchups.length - 1) {
      setCurrentMatchupIndex((prevIndex) => prevIndex + 1);
    } else {
      // Handle end of matchups
      console.log("All matchups voted on");
    }
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
