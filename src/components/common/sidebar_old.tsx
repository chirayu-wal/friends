import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { bottomLinks, centerLinks, topLinks } from "@/config/constants";
import { motion, AnimatePresence } from "framer-motion";

const Wrapper = ({
  children,
  classs,
}: {
  children: React.ReactNode;
  classs?: string;
}) => {
  return (
    <motion.div
      layout
      className={cn(
        `h-full w-full bg-white/15 backdrop-blur-lg rounded-3xl py-4 px-2 flex flex-col items-center justify-evenly space-y-2`,
        classs
      )}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const SidebarNew = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="flex flex-col space-y-3 justify-between items-center"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <motion.div
        layout
        animate={{ width: isExpanded ? 208 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col h-screen space-y-6 rounded-xl py-4 px-2 overflow-hidden"
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
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap text-lg"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
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
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap text-lg"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
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
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-nowrap text-lg"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {location.pathname === link.link && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
              </Link>
            ))}
          </Wrapper>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SidebarNew;
