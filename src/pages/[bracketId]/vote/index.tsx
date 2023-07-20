export default function VotePage() {
  return (
    <div className="flex gap-5">
      <YoutubePlayer id="F0a-DZGL86s" />
      <YoutubePlayer id="GIXV7MmjjEU" />
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
