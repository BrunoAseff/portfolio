"use client";

import BottomNav from "@/components/general/BottomNav";
import AboutMeTab from "@/components/Tabs/AboutMeTab";
import TechnologiesTab from "@/components/Tabs/TechnologiesTab";
import { useState, useEffect } from "react";

export default function Home() {
  const [tabsState, setTabsState] = useState({
    aboutMe: "open", // 'open', 'minimized', 'closed'
    technologies: "open", // 'open', 'minimized', 'closed'
  });

  const [card1Position, setCard1Position] = useState(null);
  const [card2Position, setCard2Position] = useState(null);

  const calculateInitialPositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setCard1Position({ x: width * -0.4, y: height * -0.3 });
    setCard2Position({ x: width * 0.03, y: height * -0.3 });
  };

  useEffect(() => {
    calculateInitialPositions();
    window.addEventListener("resize", calculateInitialPositions);
    return () => {
      window.removeEventListener("resize", calculateInitialPositions);
    };
  }, []);

  const handleTabStateChange = (tabName) => {
    setTabsState((prevState) => {
      // Toggle between minimized and open states
      if (prevState[tabName] === "open")
        return { ...prevState, [tabName]: "minimized" };
      if (prevState[tabName] === "minimized")
        return { ...prevState, [tabName]: "open" };
      return { ...prevState, [tabName]: "open" }; // Handle cases when it's closed
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
            defaultPosition={card1Position}
            state={tabsState.aboutMe}
            onClose={() => closeTab("aboutMe")}
            onMinimize={() => minimizeTab("aboutMe")}
            onRestore={() => restoreTab("aboutMe")}
          />
        )}
        {tabsState.technologies !== "closed" && (
          <TechnologiesTab
            defaultPosition={card2Position}
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
