import { ITvEpisodes } from "@/types/tv";
import { Play } from "lucide-react";

const TextList = ({
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
          onClick={() => onEpisodeChange(episode.episode_number)}
          key={episode.id}
          className={`flex items-center p-3 space-x-2 relative rounded-lg ${
            selectedEpisode === episode.episode_number
              ? "bg-primary/30 pr-8"
              : " bg-white/20"
          }`}
        >
          <p className="text-md">{episode.episode_number}. </p>
          <p className="text-lg font-medium">{episode.name}</p>
          {selectedEpisode === episode.episode_number && (
            <Play className="absolute right-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TextList;
