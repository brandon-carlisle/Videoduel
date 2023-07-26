import { type Video } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  type ByeVideo,
  type Matchup,
  generateMatchups,
  getWinners,
} from "@/utils/matchup";

import { Button } from "@/components/ui/button";

import YoutubePlayer from "./youtube-player";

interface ExtendedBracket {
  videos: Video[];
}

interface Props {
  bracket: ExtendedBracket;
}

export default function VoteGame({ bracket }: Props) {
  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [winners, setWinners] = useState<Video[]>([]);

  useEffect(() => {
    const generatedMatchups = generateMatchups(bracket.videos);
    setMatchups(generatedMatchups);
    setCurrentMatchupIndex(0);
    setWinners([]);
  }, [bracket.videos]);

  const currentMatchup = matchups[currentMatchupIndex];

  const handleVote = (winner: Video) => {
    if (currentMatchup) {
      const updatedMatchup = { ...currentMatchup, winner };
      const updatedMatchups = [...matchups];
      updatedMatchups[currentMatchupIndex] = updatedMatchup;
      setMatchups(updatedMatchups);

      if (currentMatchupIndex === matchups.length - 1) {
        // All matchups completed, get winners and do something with them
        const currentWinners = getWinners(updatedMatchups);
        console.log(currentWinners);
        setWinners(currentWinners);
      } else {
        setCurrentMatchupIndex(currentMatchupIndex + 1);
      }
    }
  };

  function isByeVideo(video: Video | ByeVideo): video is ByeVideo {
    // Check if 'bracketId' is null to determine if it's the "Bye" video
    return video.bracketId === null;
  }

  return (
    <div className="mt-20 flex justify-center gap-5">
      {currentMatchup && (
        <>
          <div className="flex flex-col items-center justify-center gap-3">
            {!isByeVideo(currentMatchup.a) && (
              <>
                <YoutubePlayer id={currentMatchup.a.videoId} />
                <Button onClick={() => handleVote(currentMatchup.a)}>
                  Vote A
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            {!isByeVideo(currentMatchup.b) && (
              <>
                <YoutubePlayer id={currentMatchup.b.videoId} />
                <Button onClick={() => handleVote(currentMatchup.b)}>
                  Vote B
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
