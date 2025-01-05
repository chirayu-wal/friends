import { ITvEpisodes, ITvSeasons } from "@/types/tv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import apiService from "@/config/tmdb";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Grid, List, ListOrdered } from "lucide-react";
import TextList from "./episodes/text-list";
import ThumbnailList from "./episodes/list";
import GridList from "./episodes/grid";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const EpisodePicker = ({
  seasons,
  selectedSeason,
  selectedEpisode,
  mediaId,
}: {
  seasons: ITvSeasons[];
  selectedSeason?: number;
  selectedEpisode?: number;
  mediaId: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodeList, setEpisodeList] = React.useState<ITvEpisodes[]>([]);
  const [selectedSeasonNo, setSelectedSeasonNo] = React.useState<number | null>(
    selectedSeason || Number(searchParams.get("season") || "1") || null
  );
  const [searchedEpisodeNo, setSearchedEpisodeNo] = React.useState<
    number | null
  >(null);
  const [episodeViewType, setEpisodeViewType] = React.useState<
    "text-list" | "list" | "grid"
  >("text-list");
  const [selectedEpisodeNo, setSelectedEpisodeNo] = React.useState<
    number | null
  >(selectedEpisode || Number(searchParams.get("episode") || "1") || null);

  const fetchEpisodesBySeasonMutation = useMutation({
    mutationFn: async (seasonNo: number) => {
      const res = await apiService.get(`/tv/${mediaId}/season/${seasonNo}`);
      return res.data;
    },
    onSuccess: (data) => {
      setEpisodeList(data.episodes);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSeasonChange = (seasonNo: number) => {
    setSelectedSeasonNo(seasonNo);
    setSearchParams({
      season: seasonNo.toString(),
      episode: "1",
    });
  };

  const handleEpisodeChange = (episodeNo: number) => {
    setSelectedEpisodeNo(episodeNo);
    setSearchParams({
      season: selectedSeasonNo?.toString() || "1",
      episode: episodeNo.toString(),
    });
  };

  useEffect(() => {
    if (selectedSeasonNo) {
      fetchEpisodesBySeasonMutation.mutate(selectedSeasonNo);
    }
  }, [selectedSeasonNo]);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 items-center">
        <Select
          value={"" + selectedSeasonNo}
          onValueChange={(e) => handleSeasonChange(parseInt(e))}
        >
          <SelectTrigger>
            <SelectValue
              placeholder="Select a Season"
              defaultValue={"" + selectedSeasonNo}
            />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season.id} value={"" + season.season_number}>
                Season {season.season_number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Episode Number"
          value={searchedEpisodeNo || undefined}
          onChange={(e) => {
            setSearchedEpisodeNo(parseInt(e.target.value));
            setEpisodeList(
              episodeList.filter(
                (episode) => episode.episode_number === parseInt(e.target.value)
              )
            );
          }}
        />
        <Button
          variant={"outline"}
          onClick={() => {
            if (episodeViewType === "text-list") {
              setEpisodeViewType("list");
            } else if (episodeViewType === "list") {
              setEpisodeViewType("grid");
            } else {
              setEpisodeViewType("text-list");
            }
          }}
          className="text-black"
        >
          {episodeViewType === "text-list" && <ListOrdered />}
          {episodeViewType === "list" && <List />}
          {episodeViewType === "grid" && <Grid />}
        </Button>
      </div>
      {fetchEpisodesBySeasonMutation.isPending ? (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-t-2 border-t-white animate-spin rounded-full"></div>
        </div>
      ) : (
        <>
          {selectedSeasonNo && (
            <div>
              {episodeViewType === "text-list" && (
                <TextList
                  episodes={episodeList}
                  selectedEpisode={selectedEpisodeNo || 0}
                  onEpisodeChange={handleEpisodeChange}
                />
              )}
              {episodeViewType === "list" && (
                <ThumbnailList
                  episodes={episodeList}
                  selectedEpisode={selectedEpisodeNo || 0}
                  onEpisodeChange={handleEpisodeChange}
                />
              )}
              {episodeViewType === "grid" && (
                <GridList
                  episodes={episodeList}
                  selectedEpisode={selectedEpisodeNo || 0}
                  onEpisodeChange={handleEpisodeChange}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EpisodePicker;
