import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, FilterIcon, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useUserStore from "@/store/user";
import { Input } from "../ui/input";
import SelectComp from "./Select";
import useSearchLayoverStore from "@/store/searchLayover";
const mapping = {
  "/": "Home",
  "/movie": "Movies",
  "/tv": "TV Shows",
  "/search": "Search",
  "/history": "History",
  "/watchlist": "Watchlist",
};
export const ExpandedViewRoutes = ["/movie", "/tv", "/search"];

const TopBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toggleLayover = useSearchLayoverStore((state) => state.toggle);
  const { getActiveProfile } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 py-6 w-full rounded-xl">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex items-center space-x-4">
          <div
            onClick={() => {
              if (location.key !== "default") {
                navigate(-1);
              }
            }}
            className="rounded-full w-10 h-10 bg-white/20 backdrop-blur-lg hover:bg-white/10  flex items-center justify-center"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </div>
          <div
            onClick={() => {
              if (location.key !== "default") {
                navigate(1);
              }
            }}
            className="rounded-full w-10 h-10 bg-white/20 backdrop-blur-lg hover:bg-white/10 flex items-center justify-center"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </div>

          {ExpandedViewRoutes.includes(location.pathname) ? (
            <div className="pl-6 cursor-pointer">
              <h1 className="text-2xl font-semibold">
                Explore {mapping[location.pathname as keyof typeof mapping]}
              </h1>
            </div>
          ) : (
            <div
              onClick={() => toggleLayover()}
              className="w-1/3  rounded-full px-4 py-2 bg-white/20 backdrop-blur-lg hover:bg-white/10 flex space-x-4 items-center"
            >
              <Search className="text-white w-6 h-6" />
              <span className="text-white">Search</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/select-profile">
            <Avatar className="w-12 h-12">
              <AvatarImage src={getActiveProfile()?.imageUrl} />
              <AvatarFallback>
                {getActiveProfile()?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      {ExpandedViewRoutes.includes(location.pathname) && (
        <div className="flex space-x-4 items-center">
          <div className="relative w-full text-3xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />

            <Input
              value={searchParams.get("search") || ""}
              onChange={(e) => {
                setSearchParams({ search: e.target.value });
              }}
              type="text"
              placeholder="Search"
              className="w-full text-6xl outline-none border-none bg-white/10 backdrop-blur-lg rounded-xl p-8 px-8 pl-16 placeholder:text-gray-300"
            />
          </div>
          {["/search", "/"].includes(location.pathname) && (
            <div className="w-1/4">
              <SelectComp
                options={["All", "Movies", "TV Shows"]}
                placeholder="All"
              />
            </div>
          )}
          <div className="rounded-md p-4 bg-white/10 backdrop-blur-lg hover:bg-white/20  flex items-center justify-center">
            <FilterIcon className="text-white w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
