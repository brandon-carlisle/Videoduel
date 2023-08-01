export function YoutubePlayer({ id }: { id: string }) {
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

export function EmptyPlayer() {
  return (
    <div className="flex h-[315px] w-[560px] items-center justify-center">
      Bye Round
    </div>
  );
}
