import ExpandedSidebar from "@/components/common/expandedSidebar";
import Sidebar from "@/components/common/sidebar";
import SidebarNew from "@/components/common/sidebar_old";
import TopBar from "@/components/common/topBar";
import React from "react";
import { motion } from "framer-motion";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div layout className="bg-gray-900 w-screen h-screen flex">
      <motion.div layout className="p-4 py-8">
        <SidebarNew />
      </motion.div>
      <motion.div
        layout
        className="py-4 px-2 overflow-y-auto overflow-x-hidden w-full"
      >
        <motion.div className="text-white p-4 md:px-8 rounded-xl backdrop-blur-lg w-full h-full flex flex-col space-y-6 overflow-x-hidden overflow-y-auto bg-black/50">
          <TopBar />
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DefaultLayout;
