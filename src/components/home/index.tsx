import SimpleSlider from "@/components/common/carousel";
import Scroller from "@/components/home/Scroller";
import apiService from "@/config/tmdb";
import { useDebounce } from "@/hooks/useDebounce";
import { IMediaDetails } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MediaCard from "../common/mediaCard";
import { useState } from "react";

const MainLayout = ({ type }: { type: "all" | "movie" | "tv" }) => {
  const [searchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState(0);
  const search = useDebounce(searchParams.get("search") || "", 500);
  const fType = type || searchParams.get("type") || "all";

  const { data: mediaDetails, isLoading } = useQuery<IMediaDetails[]>({
    queryKey: ["trending", "today", type],
    queryFn: async () => {
      const res = await apiService.get(`trending/${type}/day`);
      return res.data.results;
    },
  });
  const { data: searchResults, isLoading: searchLoading } = useQuery<
    IMediaDetails[]
  >({
    queryKey: ["search", search, fType],
    queryFn: async () => {
      const res = await apiService.get(
        `search/${fType === "all" ? "multi" : fType}`,
        {
          params: {
            query: search,
          },
        }
      );
      setTotalResults(res.data.total_results);
      if (fType === "all") {
        return res.data.results.filter(
          (result: IMediaDetails) =>
            result.media_type === "movie" || result.media_type === "tv"
        );
      }
      return res.data.results;
    },
    enabled: !!search,
  });
  if (isLoading || !mediaDetails) return <div>Loading</div>;
  if (searchResults) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            Search Results for {search}{" "}
            <span className="text-sm text-gray-400 pl-2">
              ({totalResults} results)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {searchResults.map((media) => (
            <MediaCard mediaDetails={media} key={media.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="space-y-4">
        <SimpleSlider mediaDetails={mediaDetails} />
        <Scroller
          endpoint={`/trending/${type}/week`}
          heading={`Trending ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        />
        {type !== "all" ? (
          <>
            <Scroller
              endpoint={`/${type}/popular`}
              heading={`Popular ${
                type.charAt(0).toUpperCase() + type.slice(1)
              }`}
            />
            <Scroller
              endpoint={`/${type}/top_rated`}
              heading={`Top Rated ${
                type.charAt(0).toUpperCase() + type.slice(1)
              }`}
            />
          </>
        ) : (
          ["movie", "tv"].map((t) => (
            <div key={t}>
              <Scroller
                endpoint={`/${t}/popular`}
                heading={`Popular ${t.charAt(0).toUpperCase() + t.slice(1)}`}
              />
              <Scroller
                endpoint={`/${t}/top_rated`}
                heading={`Top Rated ${t.charAt(0).toUpperCase() + t.slice(1)}`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainLayout;
