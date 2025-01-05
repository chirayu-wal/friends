import { Heart, History, Home, Projector, Search, Tv } from "lucide-react";

export const topLinks = [
  {
    name: "Home",
    link: "/",
    icon: <Home className="w-6 h-6 text-white" />,
  },
  {
    name: "Search",
    link: "/search",
    icon: <Search className="w-6 h-6 text-white" />,
  },
];
export const centerLinks = [
  {
    name: "Movies",
    link: "/movie",
    icon: <Projector className="w-6 h-6 text-white" />,
  },
  {
    name: "Tv Shows",
    link: "/tv",
    icon: <Tv className="w-6 h-6 text-white" />,
  },
];

export const bottomLinks = [
  {
    name: "History",
    link: "/history",
    icon: <History className="w-6 h-6 text-white" />,
  },
  {
    name: "Watchlist",
    link: "/watchlist",
    icon: <Heart className="w-6 h-6 text-white" />,
  },
];
