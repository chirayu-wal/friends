import useUserStore from "@/store/user";
import { IMediaDetails } from "@/types/movie";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const MediaCard = ({ mediaDetails }: { mediaDetails: IMediaDetails }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useUserStore();
  const isInWatchlistBool = isInWatchlist(mediaDetails.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    if (isInWatchlistBool) {
      removeFromWatchlist(mediaDetails.id);
    } else {
      addToWatchlist(mediaDetails);
    }
  };

  const fallbackImage = "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/details/${mediaDetails.media_type || "tv"}/${mediaDetails.id}`}>
      <div className="relative rounded-xl overflow-hidden mr-3 group transition-transform duration-200 hover:scale-105">
        <img
          src={
            mediaDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`
              : fallbackImage
          }
          alt={mediaDetails.title || mediaDetails.name || "Media"}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImage;
          }}
        />
        <div
          className="absolute top-3 left-3 cursor-pointer rounded-full p-2 
                     bg-black/50 backdrop-blur-sm transition-all duration-200
                     hover:bg-black/80 hover:backdrop-blur-2xl"
          onClick={handleWatchlistClick}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isInWatchlistBool
                ? "text-red-500 fill-red-500"
                : "text-white hover:text-red-500"
            }`}
          />
        </div>
        {mediaDetails.vote_average > 0 && (
          <div
            className="absolute top-3 right-3 p-1 rounded-lg px-2 
                         bg-black/50 backdrop-blur-sm flex items-center space-x-2"
          >
            <Star className="text-yellow-400 w-3 h-3 fill-yellow-400" />
            <span className="text-sm text-yellow-400">
              {mediaDetails.vote_average.toFixed(1)}
            </span>
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 
                       to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <h3 className="text-white font-semibold truncate">
            {mediaDetails.title || mediaDetails.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
