import Link from "next/link";
import { useEffect, useState } from "react";

import { type Bracket, type Video } from "@prisma/client";

import { api } from "@/utils/api";
import { generateMatchups, getWinners } from "@/utils/matchups/matchups";
import { type Matchup } from "@/utils/matchups/types";

import { Button } from "@/components/ui/button";

import Confetti from "../confetti/confetti";
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

  const handleVote = (video: Video) => {
    if (isFinalMatchup) {
      handleFinalWin(video);
      return;
    }

    setSelectedVideo(video);
    setIsZooming(true);

    // Update matchups to reflect winners
    setMatchups((prevState) => {
      const updatedMatchups = [...prevState];

      updatedMatchups[currentMatchupIndex] = {
        // @ts-expect-error TODO
        a: updatedMatchups[currentMatchupIndex]?.a,
        // @ts-expect-error TODO
        b: updatedMatchups[currentMatchupIndex]?.b,
        winner: video,
      };

      return updatedMatchups;
    });

    // Delay to allow time for the zoom-in animation
    setTimeout(() => {
      setTimeout(() => {
        handleNextMatchup();
        setIsZooming(false);
      }, 1000);
    }, 2000);
  };

  const handleNextMatchup = () => {
    if (currentMatchupIndex < matchups.length - 1) {
      setCurrentMatchupIndex((prevIndex) => prevIndex + 1);
    }
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
    <div className="mt-20 flex flex-col items-center justify-center gap-6">
      <div className="grid grid-cols-1 place-items-center gap-3 lg:grid-cols-2">
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
            {currentMatchup?.a ? (
              <VideoSelection
                handleVote={handleVote}
                matchup={currentMatchup.a}
                selectedVideo={selectedVideo}
                zooming={isZooming}
                voteLabel="A"
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
              />
            ) : (
              <EmptyPlayer />
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface VideoSelectionProps {
  matchup: Video;
  zooming: boolean;
  selectedVideo: Video | undefined;
  handleVote: (video: Video) => void;
  voteLabel: "A" | "B";
}

function VideoSelection({
  matchup,
  zooming,
  selectedVideo,
  handleVote,
  voteLabel,
}: VideoSelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={selectedVideo === matchup && zooming ? "zoom-in" : ""}>
        <div className="flex flex-col gap-3">
          <YoutubePlayer id={matchup.videoId} />
          <p className="font-semibold">{matchup.title}</p>

          <Button onClick={() => handleVote(matchup)} disabled={zooming}>
            Vote {voteLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
