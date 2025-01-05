import ExpandedSidebar from "@/components/common/expandedSidebar";
import TopBar from "@/components/common/topBar";
import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 w-screen h-screen flex ">
      <div className="md:w-24">
        <ExpandedSidebar />
      </div>
      <div className="py-4 px-2 overflow-y-auto overflow-x-hidden w-full ">
        <div className="text-white p-4 md:px-8 rounded-xl backdrop-blur-lg w-full h-full flex flex-col space-y-6 overflow-x-hidden overflow-y-auto bg-black/50">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
