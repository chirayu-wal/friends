import { bottomLinks, centerLinks, topLinks } from "@/config/constants";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const ExpandedSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed md:top-1/2 max-md:bottom-0  max-md:w-full left-0 md:left-1.5 z-20 md:-translate-y-1/2 flex md:flex-col justify-start max-md:justify-evenly md:items-center md:px-4 md:py-8 md:space-y-2 rounded-t-full md:rounded-full bg-primary/70 backdrop-blur-lg">
      {/* <div className="flex justify-center items-center">
        <img src="/logo.png" alt="logo" className="w-72 h-48" />
      </div> */}
      {[topLinks, centerLinks, bottomLinks].map((links, index) => (
        <div
          key={index}
          className="flex md:flex-col justify-between md:space-y-4 py-2"
        >
          {links.map((link) => (
            <Link key={link.name} to={link.link}>
              <button
                key={link.name}
                // variant={pathname === link.link ? "default" : "ghost"}
                className={cn(
                  "flex w-full justify-start items-center p-4",
                  pathname === link.link && "bg-white/10 rounded-full"
                )}
              >
                {link.icon}
                {/* <span className="text-xl font-semibold text-white">
                  {link.name}
                </span> */}
              </button>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpandedSidebar;
