// vote-game.tsx
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
  const [currentRound, setCurrentRound] = useState(1);
  const [finalWinner, setFinalWinner] = useState<null | Video>(null);

  useEffect(() => {
    const generatedMatchups = generateMatchups(bracket.videos);
    setMatchups(generatedMatchups);
    setCurrentMatchupIndex(0);
    setWinners([]);
    setCurrentRound(1);
    setFinalWinner(null);
  }, [bracket.videos]);

  useEffect(() => {
    if (winners.length > 1) {
      const generatedMatchups = generateMatchups(winners);
      setMatchups(generatedMatchups);
      setCurrentMatchupIndex(0);
      setWinners([]);
      setCurrentRound((prevRound) => prevRound + 1);
    }
  }, [winners]);

  const currentMatchup = matchups[currentMatchupIndex];

  const handleVote = (winner: Video) => {
    if (currentMatchup) {
      const updatedMatchup = { ...currentMatchup, winner };
      const updatedMatchups = [...matchups];
      updatedMatchups[currentMatchupIndex] = updatedMatchup;
      setMatchups(updatedMatchups);

      if (currentMatchupIndex === matchups.length - 1) {
        const currentWinners = getWinners(updatedMatchups);
        setWinners(currentWinners);

        if (currentWinners.length === 1) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          setFinalWinner(currentWinners[0]!);
        }
      } else {
        setCurrentMatchupIndex(currentMatchupIndex + 1);
      }
    } else {
      console.log("All matchups completed. No further votes allowed.");
    }
  };

  function isByeVideo(video: Video | ByeVideo): video is ByeVideo {
    return video.bracketId === null;
  }

  const isFinalRound = matchups.length === 1;

  console.log("currentMatchup: ", currentMatchup);
  console.log("matchups: ", matchups);

  return (
    <div className="mt-20 flex justify-center gap-5">
      <div>Round: {isFinalRound ? "Final" : currentRound}</div>
      {finalWinner ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <YoutubePlayer id={finalWinner.videoId} />
          <p>Final winner is video: {finalWinner.videoId}</p>
        </div>
      ) : (
        currentMatchup && (
          <>
            <div className="flex flex-col items-center justify-center gap-3">
              {!isByeVideo(currentMatchup.a) ? (
                <div className="flex flex-col gap-3">
                  <YoutubePlayer id={currentMatchup.a.videoId} />
                  <p>{currentMatchup.a.videoId}</p>
                  <Button onClick={() => handleVote(currentMatchup.a)}>
                    Vote A
                  </Button>
                </div>
              ) : (
                <ByeRound />
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              {!isByeVideo(currentMatchup.b) ? (
                <div className="flex flex-col gap-3">
                  <YoutubePlayer id={currentMatchup.b.videoId} />
                  <p>{currentMatchup.b.videoId}</p>
                  <Button onClick={() => handleVote(currentMatchup.b)}>
                    Vote B
                  </Button>
                </div>
              ) : (
                <ByeRound />
              )}
            </div>
          </>
        )
      )}
    </div>
  );
}

function ByeRound() {
  return (
    <div className="flex h-[315px] w-[560px] items-center justify-center">
      Bye Round
    </div>
  );
}
