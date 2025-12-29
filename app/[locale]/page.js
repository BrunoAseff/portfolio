"use client";

import AboutMePage from "@/components/AboutMe/AboutMePage";
import TabsMobile from "@/components/Tabs/TabsMobile";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="md:hidden">
        <TabsMobile />
      </div>
      
      <div className="hidden md:block">
        <AboutMePage />
      </div>
    </div>
  );
}
