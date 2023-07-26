import { Button } from "@/components/ui/button";

import YoutubePlayer from "./youtube-player";

interface Props {
  videoA: string;
  videoB: string;
}

export default function VoteGame({ videoA, videoB }: Props) {
  return (
    <div className="mt-20 flex justify-center gap-5">
      <div className="flex flex-col items-center justify-center gap-3">
        <YoutubePlayer id={videoA} />
        <Button>Vote</Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <YoutubePlayer id={videoB} />
        <Button>Vote</Button>
      </div>
    </div>
  );
}
