import { useQuery } from "@tanstack/react-query";
import MovieDetails from "./media-detail";
import { servers } from "@/config/servers";
import apiService from "@/config/tmdb";
import { IMediaDetails } from "@/types/movie";
import EpisodePicker from "../tv/episodePicker";
import PlayerOptions from "./playerOptions";
import useUserStore from "@/store/user";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MediaPlayer = ({ type, id }: { type: "movie" | "tv"; id: string }) => {
  const { getActiveProfile, addOrUpdateToHistory } = useUserStore();
  const [searchParams] = useSearchParams();

  const { data: mediaDetails, isLoading } = useQuery<IMediaDetails>({
    queryKey: ["mediaDetails", type, id],
    queryFn: async () => {
      const res = await apiService.get(`/${type}/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (mediaDetails) {
      addOrUpdateToHistory({
        id: Number(id),
        mediaType: type as "movie" | "tv",
        watchedOnServerId:
          getActiveProfile()?.preferences.preferredServer || "1",
        seasonNumber: searchParams.get("season")
          ? parseInt(searchParams.get("season") || "1")
          : 1,
        episodeNumber: searchParams.get("episode")
          ? parseInt(searchParams.get("episode") || "1")
          : 1,
        progress: 0,
        mediaDetails: mediaDetails,
      });
    }
  }, [mediaDetails, searchParams, type, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-black text-white p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 space-y-4">
        <div className="h-[70vh] bg-white/10 backdrop-blur-sm rounded-xl p-1">
          <iframe
            id="iframeee"
            src={servers
              .find(
                (server) =>
                  server.id === getActiveProfile()?.preferences.preferredServer
              )
              ?.getter(
                type,
                id,
                searchParams.get("season") || undefined,
                searchParams.get("episode") || undefined
              )}
            // allow="fullscreen"
            // onClick={handleClick}
            className={`w-full h-full rounded-lg`}
            width={"100%"}
            height={"100%"}
            referrerPolicy="origin"
            // frameBorder="0"
            // scrolling="no"
            allowFullScreen
            // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <PlayerOptions />
      </div>

      <div className="space-y-4">
        {type === "tv" && (
          <EpisodePicker
            seasons={mediaDetails?.seasons || []}
            mediaId={id}
            selectedSeason={
              searchParams.get("season")
                ? parseInt(searchParams.get("season") || "1")
                : 1
            }
            selectedEpisode={
              searchParams.get("episode")
                ? parseInt(searchParams.get("episode") || "1")
                : 1
            }
          />
        )}
        <MovieDetails mediaDetails={mediaDetails} />
      </div>
    </div>
  );
};

export default MediaPlayer;
