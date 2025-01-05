import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TvIcon, Film, Share2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useUserStore, { HistoryItem } from "@/store/user";

export function HistoryMediaCard({
  historyItem,
}: {
  historyItem: HistoryItem;
}) {
  const { removeFromHistory } = useUserStore();
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(
          `/details/${historyItem.mediaType}/${historyItem.mediaDetails.id}${
            historyItem.mediaType === "tv"
              ? `?season=${historyItem.seasonNumber}&episode=${historyItem.episodeNumber}`
              : ""
          }`
        );
      }}
      className="overflow-hidden border-none bg-transparent backdrop-blur-lg relative"
    >
      <div className="flex">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

        <div className="absolute inset-0 w-full bg-black/90">
          <img
            src={`https://image.tmdb.org/t/p/w500${historyItem.mediaDetails.backdrop_path}`}
            alt={`${
              historyItem.mediaDetails.title || historyItem.mediaDetails.name
            } poster`}
            className="object-cover w-full h-full opacity-20"
          />
        </div>
        <div className="relative p-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${historyItem.mediaDetails.poster_path}`}
            alt={`${
              historyItem.mediaDetails.title || historyItem.mediaDetails.name
            } poster`}
            className="object-cover w-64 h-52 rounded-lg"
          />
          <div className="absolute bottom-2 left-2 p-2 rounded-lg">
            <div className="flex items-center space-x-1 text-white">
              {historyItem.mediaDetails.media_type === "movie" ? (
                <Film className="h-3 w-3" />
              ) : (
                <TvIcon className="h-3 w-3" />
              )}
              <span className="text-xs font-medium">
                {historyItem.mediaDetails.media_type === "movie"
                  ? "Movie"
                  : "TV"}
              </span>
            </div>
          </div>
        </div>

        <CardContent className="w-full p-4 m-2 flex flex-col justify-between bg-black/20 backdrop-blur-lg rounded-lg text-white">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-3xl leading-none tracking-tight">
                  {historyItem.mediaDetails.title ||
                    historyItem.mediaDetails.name}
                </h3>
                {historyItem.mediaDetails.media_type === "tv" && (
                  <p className="text-sm text-gray-200">
                    S{historyItem.seasonNumber}, E{historyItem.episodeNumber}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(
                      `${window.location.origin}/watch/${historyItem.mediaDetails.media_type}/${historyItem.mediaDetails.id}`
                    );
                    toast.success("Link copied to clipboard");
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(historyItem.id);
                    toast.success("Removed from history");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last watched:{" "}
              {new Date(historyItem.watchedAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
