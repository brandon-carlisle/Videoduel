/* eslint-disable @typescript-eslint/ban-ts-comment */
import Link from "next/link";
import { useEffect, useState } from "react";

import { type Bracket, type Video } from "@prisma/client";

import { api } from "@/utils/api";
import { generateMatchups, getWinners } from "@/utils/matchups/matchups";
import { type Matchup } from "@/utils/matchups/types";

import { Button } from "@/components/ui/button";

import Confetti from "../confetti/confetti";
import { getCurrentRound } from "./utils";
import { VideoSelection } from "./video-selection";
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
  const [finalWinner, setFinalWinner] = useState<Video>();

  const videoMutate = api.video.addWin.useMutation();

  useEffect(() => {
    const newMatchups = generateMatchups(bracket.videos);
    setMatchups(newMatchups);
    setCurrentMatchupIndex(0); // Initialize to the first matchup
  }, [bracket.videos]);

  const updateAndHandleNextMatchups = (video: Video) => {
    // Update matchups to reflect winners
    setMatchups((prevState) => {
      const updatedMatchups = [...prevState];

      updatedMatchups[currentMatchupIndex] = {
        // @ts-ignore TODO
        a: updatedMatchups[currentMatchupIndex]?.a,
        // @ts-ignore TODO
        b: updatedMatchups[currentMatchupIndex]?.b,
        winner: video,
      };

      return updatedMatchups;
    });

    if (currentMatchupIndex < matchups.length - 1) {
      setCurrentMatchupIndex((prevIndex) => prevIndex + 1);
    }

    setIsZooming(false);
  };

  const handleVote = (video: Video) => {
    if (isFinalMatchup) {
      handleFinalWin(video);
      return;
    }

    setIsZooming(true);
    setSelectedVideo(video);
  };

  const handleNextRound = () => {
    const roundWinners = getWinners(matchups);
    const nextRoundMatchups = generateMatchups(roundWinners);
    setMatchups(nextRoundMatchups);
    setCurrentMatchupIndex(0);
    setIsZooming(false);
  };

  if (matchups[matchups.length - 1]?.winner) {
    handleNextRound();
  }

  // Get the current matchup from the list
  const currentMatchup = matchups[currentMatchupIndex] || null;

  // Check if current matchup is the final
  const isFinalMatchup = matchups.length === 1;

  const handleFinalWin = (winner: Video) => {
    setFinalWinner(winner);

    // We will always have the bracket ID.
    if (winner.bracketId) {
      videoMutate.mutate({ bracketId: winner.bracketId, id: winner.id });
    }
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center gap-6">
        {finalWinner ? (
          <>
            <Confetti />
            <div className="self-center lg:col-span-2">
              <p className="mb-3 text-center text-2xl font-semibold">
                {finalWinner.title} wins 🏆
              </p>
              <YoutubePlayer id={finalWinner.videoId} />

              <div className="mt-3 flex items-center justify-center">
                <Button asChild variant="outline">
                  <Link href={`/bracket/${bracket.id}`}>View results</Link>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold">
              {getCurrentRound(matchups.length)}
            </p>
            <div className="grid w-full grid-cols-1 justify-center gap-3 md:px-10 lg:grid-cols-2">
              {currentMatchup?.a ? (
                <VideoSelection
                  handleVote={handleVote}
                  matchup={currentMatchup.a}
                  selectedVideo={selectedVideo}
                  zooming={isZooming}
                  voteLabel="A"
                  updateAndHandleNextMatchups={updateAndHandleNextMatchups}
                />
              ) : (
                <EmptyPlayer />
              )}

              {currentMatchup?.b ? (
                <VideoSelection
                  handleVote={handleVote}
                  matchup={currentMatchup.b}
                  selectedVideo={selectedVideo}
                  zooming={isZooming}
                  voteLabel="B"
                  updateAndHandleNextMatchups={updateAndHandleNextMatchups}
                />
              ) : (
                <EmptyPlayer />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
