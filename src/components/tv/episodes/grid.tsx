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
          onClick={() => onEpisodeChange(episode.id)}
          className={`flex items-center p-3 space-x-2 ${
            selectedEpisode === episode.id ? "bg-white/20" : " bg-white/10"
          }`}
        >
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
              alt={episode.name}
              className={`w-16 h-16 rounded-md ${
                selectedEpisode === episode.id ? "opacity-50" : ""
              }`}
            />
            {selectedEpisode === episode.id && (
              <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridList;
