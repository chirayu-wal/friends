import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { bottomLinks, centerLinks, topLinks } from "@/config/constants";

const Wrapper = ({
  children,
  classs,
}: {
  children: React.ReactNode;
  classs?: string;
}) => {
  return (
    <div
      className={cn(
        `h-full w-full bg-white/15 backdrop-blur-lg rounded-3xl py-4 px-2 flex flex-col items-center justify-evenly space-y-2 transition-all duration-300`,
        classs
      )}
    >
      {children}
    </div>
  );
};

const SidebarNew = () => {
  const location = useLocation();

  return (
    <div className="group flex flex-col space-y-3 justify-between items-center transition-all duration-300">
      <div
        className="flex flex-col h-screen space-y-6 w-20 group-hover:w-52
        transition-all duration-300 rounded-xl py-4 px-2 overflow-hidden"
      >
        <div className="flex flex-col h-1/5 text-white">
          <Wrapper>
            {topLinks.map((link) => (
              <Link key={link.name} to={link.link} className="w-full">
                <div
                  className={cn(
                    "w-full p-3 rounded-full text-white relative flex items-center space-x-6 transition-all duration-300 group-hover:px-8 group-hover:py-4 group-hover:rounded-xl",
                    location.pathname === link.link
                      ? "bg-black text-white"
                      : "hover:bg-black  bg-gray-800"
                  )}
                >
                  {link.icon}
                  <span
                    className={cn(
                      "whitespace-nowrap hidden group-hover:block opacity-0 group-hover:opacity-100 delay-300 transition-all duration-300 text-lg"
                    )}
                  >
                    {link.name}
                  </span>
                  {location.pathname === link.link && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
              </Link>
            ))}
          </Wrapper>
        </div>

        <div className="flex flex-col h-3/5">
        <Wrapper classs="justify-start">
            {centerLinks.map((link) => (
              <Link key={link.name} to={link.link} className="w-full">
                <div
                  className={cn(
                    "w-full p-3 rounded-full text-white relative flex items-center space-x-6 transition-all duration-300 group-hover:px-8 group-hover:py-4 group-hover:rounded-xl",
                    location.pathname === link.link
                      ? "bg-black text-white"
                      : "hover:bg-black  bg-gray-800"
                  )}
                >
                  {link.icon}
                  <span
                    className={cn(
                      "whitespace-nowrap hidden group-hover:block opacity-0 group-hover:opacity-100 delay-300 transition-all duration-300 text-lg"
                    )}
                  >
                    {link.name}
                  </span>
                  {location.pathname === link.link && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
              </Link>
            ))}
          </Wrapper>
        </div>

        <div className="flex flex-col h-1/5">
        <Wrapper>
            {bottomLinks.map((link) => (
              <Link key={link.name} to={link.link} className="w-full">
                <div
                  className={cn(
                    "w-full p-3 rounded-full text-white relative flex items-center space-x-6 transition-all duration-300 group-hover:px-8 group-hover:py-4 group-hover:rounded-xl",
                    location.pathname === link.link
                      ? "bg-black text-white"
                      : "hover:bg-black  bg-gray-800"
                  )}
                >
                  {link.icon}
                  <span
                    className={cn(
                      "whitespace-nowrap hidden group-hover:block opacity-0 group-hover:opacity-100 delay-300 transition-all duration-300 text-lg"
                    )}
                  >
                    {link.name}
                  </span>
                  {location.pathname === link.link && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
              </Link>
            ))}
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default SidebarNew;
