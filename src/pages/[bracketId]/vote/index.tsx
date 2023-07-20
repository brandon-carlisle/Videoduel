import { Button } from "@/components/ui/button";

export default function VotePage() {
  return (
    <div className="mt-20 flex justify-center gap-5">
      <div className="flex flex-col items-center justify-center gap-3">
        <YoutubePlayer id="F0a-DZGL86s" />
        <Button>Vote</Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <YoutubePlayer id="GIXV7MmjjEU" />
        <Button>Vote</Button>
      </div>
    </div>
  );
}

function YoutubePlayer({ id }: { id: string }) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
