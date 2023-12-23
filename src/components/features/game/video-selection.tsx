import { type Video } from "@prisma/client";

import { cn } from "@/utils/cn";

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
  const classes = cn(
    selectedVideo === matchup && zooming ? "zoom-in" : "",
    "h-full",
  );

  return (
    <div
      className={classes}
      onAnimationEnd={() => {
        updateAndHandleNextMatchups(matchup);
      }}
    >
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
  );
}
