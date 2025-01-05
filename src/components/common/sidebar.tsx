import { bottomLinks, centerLinks, topLinks } from "@/config/constants";
import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Wrapper = ({
  children,
  classs,
  isHovered,
}: {
  children: React.ReactNode;
  classs?: string;
  isHovered?: boolean;
}) => {
  return (
    <div
      className={cn(
        `h-full bg-white/15 backdrop-blur-lg rounded-full py-4 px-2 flex flex-col items-center justify-evenly space-y-2 transition-all duration-300`,
        isHovered ? "w-48 rounded-lg" : "w-16",
        classs
      )}
    >
      {children}
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col space-y-3 justify-between items-center transition-all duration-300"
    >
      <div className="h-1/5">
        <Wrapper isHovered={isHovered}>
          {topLinks.map((link) => (
            <Link key={link.name} to={link.link} className="w-full">
              <div
                className={cn(
                  "w-full p-4 rounded-full relative flex space-x-4 items-center transition-all duration-300",
                  location.pathname === link.link
                    ? "bg-black text-green-500"
                    : "hover:bg-black",
                  isHovered ? "px-8 py-4 rounded-xl" : "p-4"
                )}
              >
                {link.icon}
                {isHovered && (
                  <p className="capitalize text-lg text-white transition-opacity duration-300 opacity-100">
                    {link.name}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </Wrapper>
      </div>
      <div className="h-3/5">
        <Wrapper classs="justify-start" isHovered={isHovered}>
          {centerLinks.map((link) => (
            <Link key={link.name} to={link.link} className="w-full">
              <div
                className={cn(
                  "w-full p-4 rounded-full relative flex space-x-4 items-center transition-all duration-300",
                  location.pathname === link.link
                    ? "bg-black text-white"
                    : "hover:bg-black"
                )}
              >
                {link.icon}
                {isHovered && (
                  <p className="capitalize text-lg text-white transition-opacity duration-300 opacity-100">
                    {link.name}
                  </p>
                )}
                {location.pathname === link.link && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </div>
            </Link>
          ))}
        </Wrapper>
      </div>
      <div className="h-1/5">
        <Wrapper isHovered={isHovered}>
          {bottomLinks.map((link) => (
            <Link key={link.name} to={link.link} className="w-full">
              <div
                className={cn(
                  "w-full p-4 rounded-full relative flex space-x-4 items-center transition-all duration-300",
                  location.pathname === link.link
                    ? "bg-black text-white"
                    : "hover:bg-black"
                )}
              >
                {link.icon}
                {isHovered && (
                  <p className="capitalize text-lg text-white transition-opacity duration-300 opacity-100">
                    {link.name}
                  </p>
                )}
                {location.pathname === link.link && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </div>
            </Link>
          ))}
        </Wrapper>
      </div>
    </div>
  );
};

export default Sidebar;
