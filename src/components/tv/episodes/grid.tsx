import { ITvEpisodes } from "@/types/tv";
import { Play } from "lucide-react";

const GridList = ({
  episodes,
  selectedEpisode,
  onEpisodeChange,
}: {
  episodes: ITvEpisodes[];
  selectedEpisode: number;
  onEpisodeChange: (episodeNo: number) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          onClick={() => onEpisodeChange(episode.episode_number)}
          className={`flex items-center group p-0 space-x-2 rounded-lg ${
            selectedEpisode === episode.episode_number
              ? "bg-primary/80"
              : " bg-white/20"
          }`}
        >
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
              alt={episode.name}
              className={`w-full h-full rounded-lg ${
                selectedEpisode === episode.episode_number ? "opacity-50" : ""
              }`}
            />
            <div className="hidden group-hover:block text-lg absolute inset-0 bg-black/60 p-2">
              {episode.episode_number} . {episode.name}
            </div>
            {selectedEpisode === episode.episode_number && (
              <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridList;
