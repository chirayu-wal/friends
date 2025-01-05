import { bottomLinks, centerLinks, topLinks } from "@/config/constants";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const ExpandedSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed top-1/2 left-1.5 z-20 -translate-y-1/2 flex flex-col justify-start items-center divide-gray-100 px-4 py-8 space-y-2  rounded-full bg-red-900/30 backdrop-blur-lg">
      {/* <div className="flex justify-center items-center">
        <img src="/logo.png" alt="logo" className="w-72 h-48" />
      </div> */}
      {[topLinks, centerLinks, bottomLinks].map((links, index) => (
        <div
          key={index}
          className="w-full flex flex-col justify-between space-y-4 py-2"
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
