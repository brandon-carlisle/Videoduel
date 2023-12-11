import { type Video } from "@prisma/client";

import { Button } from "@/components/ui/button";

import { YoutubePlayer } from "./youtube-player";

interface VideoSelectionProps {
  matchup: Video;
  zooming: boolean;
  selectedVideo: Video | undefined;
  handleVote: (video: Video) => void;
  voteLabel: "A" | "B";
  updateAndHandleNextMatchups: (video: Video) => void;
}

export function VideoSelection({
  matchup,
  zooming,
  selectedVideo,
  handleVote,
  voteLabel,
  updateAndHandleNextMatchups,
}: VideoSelectionProps) {
  return (
    <div
      className={selectedVideo === matchup && zooming ? "zoom-in" : ""}
      onAnimationEnd={() => {
        updateAndHandleNextMatchups(matchup);
      }}
    >
      <div className="h-full max-w-[560px]">
        <div className="flex h-full flex-col gap-3">
          <YoutubePlayer id={matchup.videoId} />
          <p className="font-semibold">{matchup.title}</p>

          <Button
            onClick={() => handleVote(matchup)}
            disabled={zooming}
            className="mt-auto"
          >
            Vote {voteLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
