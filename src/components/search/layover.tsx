import {
  Calendar,
  FilterIcon,
  Projector,
  Search,
  StarIcon,
  Tv,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useSearchLayoverStore from "@/store/searchLayover";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fullSearch } from "@/lib/common";
import moment from "moment";

const Layover = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const showLayover = useSearchLayoverStore((state) => state.isVisible);
  const toggleLayover = useSearchLayoverStore((state) => state.toggle);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => fullSearch(debouncedSearch),
  });

  return (
    <div
      onClick={() => toggleLayover()}
      className={`fixed top-0 left-0 bottom-0 right-0 w-screen h-screen bg-black/90 backdrop-blur-sm z-10 ${
        showLayover ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center h-full">
        {/* TODO:make this div in center of the */}
        <div
          onClick={stopPropagation}
          className="w-full md:w-1/3 flex flex-col space-y-4 z-20 p-6 rounded-lg"
        >
          <p className="text-white text-2xl text-center">Search Anything</p>
          <div className="flex items-center space-x-4">
            <div className="w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full text-xl outline-none border-none bg-white/10 backdrop-blur-lg rounded-xl py-8 px-8 pl-16 placeholder:text-gray-300 text-white"
              />
            </div>
            <Link to={"/search"} onClick={toggleLayover}>
              <Button variant={"default"} className="p-8">
                <FilterIcon className="text-white w-8 h-8" />
              </Button>
            </Link>
          </div>
          {searchResults && searchResults.length > 0 && (
            <div className="flex flex-col space-y-2 bg-white/10 backdrop-blur-lg rounded-xl p-2">
              {isLoading && <p className="text-white text-xl">Loading...</p>}
              {searchResults &&
                searchResults
                  .filter(
                    (result: any) =>
                      result.media_type === "tv" ||
                      result.media_type === "movie"
                  )
                  .slice(0, 5)
                  .map((result: any) => (
                    <div
                      onClick={() => {
                        navigate(`/details/${result.media_type}/${result.id}`);
                        toggleLayover();
                      }}
                      className="flex items-center space-x-4 bg-black backdrop-blur-lg rounded-xl p-1"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${
                          result.poster_path || result.backdrop_path
                        }`}
                        alt={result.name || result.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="w-full h-24 flex flex-col space-y-2 p-2 px-4 bg-white/10 backdrop-blur-lg rounded-xl">
                        <p className="text-white text-2xl font-semibold">
                          {result.title || result.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-white text-xs md:text-sm flex items-center space-x-2 p-2 px-4 bg-black/50 rounded-xl">
                            <StarIcon className="w-4 h-4 text-primary fill-primary" />
                            <span className="capitalize font-medium">
                              {result.vote_average.toFixed(1)}
                            </span>
                          </p>
                          <p className="text-white text-xs md:text-sm flex items-center space-x-2 p-2 px-4 bg-black/50 rounded-xl">
                            {result.media_type === "tv" && (
                              <Tv className="w-4 h-4 text-primary" />
                            )}
                            {result.media_type === "movie" && (
                              <Projector className="w-4 h-4 text-primary" />
                            )}
                            <span className="capitalize font-medium">
                              {result.media_type}
                            </span>
                          </p>

                          <p className="text-white max-md:hidden text-xs md:text-sm flex items-center space-x-2 p-2 px-4 bg-black/50 rounded-xl">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="capitalize font-medium">
                              {moment(
                                result.release_date || result.first_air_date
                              ).format("ll")}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layover;
