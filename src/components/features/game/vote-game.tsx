import { type Bracket, type Video } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

import { generateMatchups, getWinners } from "@/utils/matchups/matchup";
import { type Matchup } from "@/utils/matchups/types";

import { Button } from "@/components/ui/button";

import { EmptyPlayer, YoutubePlayer } from "./youtube-player";

interface ExtendedBracket extends Bracket {
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

  const startNewRound = useCallback((newMatchups: Matchup[]) => {
    setMatchups(newMatchups);
    setCurrentMatchupIndex(0);
    setWinners([]);
    setCurrentRound((prevRound) => prevRound + 1);
    // moveToNextMatchup(0, newMatchups); // Skip initial double-byes
  }, []);

  useEffect(() => {
    const generatedMatchups = generateMatchups(bracket.videos);
    startNewRound(generatedMatchups);
  }, [bracket.videos, startNewRound]);

  const currentMatchup = matchups[currentMatchupIndex];

  const handleVote = (winner: Video) => {
    if (!currentMatchup) return;

    const updatedMatchup = { ...currentMatchup, winner };
    const updatedMatchups = matchups.map((matchup, index) =>
      index === currentMatchupIndex ? updatedMatchup : matchup,
    );
    setMatchups(updatedMatchups);
    moveToNextMatchup(currentMatchupIndex + 1, updatedMatchups);
  };

  const moveToNextMatchup = (startIndex: number, matchupList: Matchup[]) => {
    let nextIndex = startIndex;

    while (
      nextIndex < matchupList.length &&
      matchupList[nextIndex]?.a === null &&
      matchupList[nextIndex]?.b === null
    ) {
      nextIndex += 1;
    }

    if (nextIndex < matchupList.length) {
      setCurrentMatchupIndex(nextIndex);
    } else {
      const currentWinners = getWinners(matchupList);
      setWinners(currentWinners);

      if (currentWinners.length === 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setFinalWinner(currentWinners[0]!);
      }
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-6">
      <div className="text-2xl font-semibold">Round: {currentRound}</div>
      {finalWinner ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <YoutubePlayer id={finalWinner.videoId} />
          <p>Final winner is video: {finalWinner.videoId}</p>
        </div>
      ) : (
        currentMatchup && (
          <div className="grid grid-cols-1 place-items-center gap-3 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-3">
              {currentMatchup.a ? (
                <div className="flex flex-col gap-3">
                  <YoutubePlayer id={currentMatchup.a.videoId} />
                  <p>{currentMatchup.a.videoId}</p>

                  <Button onClick={() => handleVote(currentMatchup.a)}>
                    Vote A
                  </Button>
                </div>
              ) : (
                <EmptyPlayer />
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              {currentMatchup.b ? (
                <div className="flex flex-col gap-3">
                  <YoutubePlayer id={currentMatchup.b.videoId} />
                  <p>{currentMatchup.b.videoId}</p>

                  <Button onClick={() => handleVote(currentMatchup.b)}>
                    Vote B
                  </Button>
                </div>
              ) : (
                <EmptyPlayer />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
