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
          onClick={() => onEpisodeChange(episode.id)}
          key={episode.id}
          className={`flex items-center p-3 space-x-2 relative pr-16 ${
            selectedEpisode === episode.id ? "bg-white/20" : " bg-white/10"
          }`}
        >
          <p>{episode.episode_number}. </p>
          <p className="text-sm">{episode.name}</p>
          {selectedEpisode === episode.id && (
            <Play className="absolute right-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TextList;
