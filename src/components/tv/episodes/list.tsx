import { ITvEpisodes } from "@/types/tv";
import { Play } from "lucide-react";

const ThumbnailList = ({
  episodes,
  selectedEpisode,
  onEpisodeChange,
}: {
  episodes: ITvEpisodes[];
  selectedEpisode: number;
  onEpisodeChange: (episodeNo: number) => void;
}) => {
  return (
    <div className="space-y-2">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          onClick={() => onEpisodeChange(episode.episode_number)}
          className={`flex p-2 space-x-2 rounded-lg ${
            selectedEpisode === episode.episode_number
              ? "bg-primary/30"
              : " bg-white/20"
          }`}
        >
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
              alt={episode.name}
              className="w-32 h-24 rounded-md object-cover"
            />
            {selectedEpisode === episode.episode_number && (
              <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
          <div className="max-w-[60%] flex flex-col space-y-2 justify-start items-start">
            <p className="text-lg">
              {episode.episode_number} .{" "}
              {episode.name.length > 15
                ? episode.name.slice(0, 15) + "..."
                : episode.name}
            </p>
            <p className="text-xs">
              {episode.overview.length > 90
                ? episode.overview.slice(0, 90) + "..."
                : episode.overview}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailList;
