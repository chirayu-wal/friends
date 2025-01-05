import { Star, Calendar, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMediaDetails } from "@/types/movie";
import apiService from "@/config/tmdb";
import { useQuery } from "@tanstack/react-query";
import { ICast } from "@/types/cast";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetails({
  mediaDetails,
}: {
  mediaDetails: IMediaDetails | undefined;
}) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  const { data: credits, isLoading: creditsLoading } = useQuery<{
    id: number;
    cast: ICast[];
  }>({
    queryKey: ["credits", mediaDetails?.id],
    queryFn: async () => {
      const credits = await apiService.get(`movie/${mediaDetails?.id}/credits`);
      return credits.data;
    },
    enabled: !!mediaDetails?.id,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const displayedCast = useMemo(() => {
    if (!credits?.cast) return [];
    return showAllCharacters ? credits.cast : credits.cast.slice(0, 3);
  }, [credits?.cast, showAllCharacters]);

  if (!mediaDetails) {
    return (
      <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
    );
  }

  const {
    id,
    title,
    overview,
    genres,
    production_companies,
    poster_path,
    vote_average,
    release_date,
  } = mediaDetails;

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto space-y-6 bg-white/10 backdrop-blur-sm rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">{title}</h1>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={`${title} Poster`}
            className="object-cover rounded-lg"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="fill-primary text-primary w-4 h-4" />
            <span>{vote_average?.toFixed(1)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="bg-white/20 backdrop-blur-3xl rounded-xl p-0.5 py-1">
            <p className="font-medium text-center py-1 flex items-center px-3 space-x-2 gap-1">
              <Circle className="fill-primary text-primary w-4 h-4" />
              {mediaDetails.status}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-3xl rounded-xl p-0.5 py-1">
            <p className="font-medium text-center py-1 flex items-center px-3 space-x-2 gap-1">
              <Calendar className="fill-primary text-primary w-4 h-4" />
              {new Date(release_date || "").toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-3xl rounded-xl p-0.5 py-1">
            <p className="font-medium text-center py-1 flex items-center px-3 space-x-2 gap-1">
              <Star className="fill-primary text-primary w-4 h-4" />
              {vote_average?.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {genres?.map((genre) => (
          <Button key={genre.id} variant="default" className="border-none">
            {genre.name}
          </Button>
        ))}
      </div>
      <div
        className="relative rounded-lg overflow-hidden"
        onClick={() => setShowFullOverview(!showFullOverview)}
      >
        <div
          className={`p-4 rounded-lg bg-white/5 ${
            !showFullOverview && "max-h-[15vh]"
          } overflow-hidden`}
        >
          <p className="text-gray">{overview}</p>
          {!showFullOverview && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent"></div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Characters</h2>
          <Button
            variant="link"
            className="text-gray-400"
            onClick={() => setShowAllCharacters(!showAllCharacters)}
          >
            {showAllCharacters ? "show less" : "view all"}
          </Button>
        </div>
        <div className="space-y-3">
          {creditsLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 bg-white/10 p-2 rounded-lg"
                  >
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))
            : displayedCast.map((character) => (
                <div
                  key={character.id}
                  className="flex items-center space-x-3 bg-white/10 p-2 rounded-lg"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${character.profile_path}`}
                    alt={character.name}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium">{character.name}</p>
                    <p className="text-sm text-gray-400">
                      {character.character}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
