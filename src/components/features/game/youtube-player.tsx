export function YoutubePlayer({ id }: { id: string }) {
  return (
    <div className="relative w-full overflow-hidden pb-[56.25%]">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export function EmptyPlayer() {
  return <div className="relative w-full overflow-hidden pb-[56.25%]"></div>;
}
