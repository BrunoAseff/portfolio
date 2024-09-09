"use client";

import BottomNav from "@/components/general/BottomNav";
import AboutMeTab from "@/components/Tabs/AboutMeTab";
import TechnologiesTab from "@/components/Tabs/TechnologiesTab";
import { useState } from "react";

export default function Home() {
  const [tabsState, setTabsState] = useState({
    aboutMe: "open",
    technologies: "open",
  });

  const handleTabStateChange = (tabName) => {
    setTabsState((prevState) => {
      if (prevState[tabName] === "open")
        return { ...prevState, [tabName]: "minimized" };
      if (prevState[tabName] === "minimized")
        return { ...prevState, [tabName]: "open" };
      return { ...prevState, [tabName]: "open" };
    });
  };

  const closeTab = (tabName) => {
    setTabsState((prevState) => ({ ...prevState, [tabName]: "closed" }));
  };

  const minimizeTab = (tabName) => {
    setTabsState((prevState) => ({ ...prevState, [tabName]: "minimized" }));
  };

  const restoreTab = (tabName) => {
    setTabsState((prevState) => ({ ...prevState, [tabName]: "open" }));
  };

  return (
    <main className="border-6 border-blue-600 h-screen flex flex-col max-w-full justify-center items-center relative">
      <section>
        {tabsState.aboutMe !== "closed" && (
          <AboutMeTab
            state={tabsState.aboutMe}
            onClose={() => closeTab("aboutMe")}
            onMinimize={() => minimizeTab("aboutMe")}
            onRestore={() => restoreTab("aboutMe")}
          />
        )}
        {tabsState.technologies !== "closed" && (
          <TechnologiesTab
            state={tabsState.technologies}
            onClose={() => closeTab("technologies")}
            onMinimize={() => minimizeTab("technologies")}
            onRestore={() => restoreTab("technologies")}
          />
        )}
      </section>

      <BottomNav tabsState={tabsState} onTabClick={handleTabStateChange} />
    </main>
  );
}
