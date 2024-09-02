"use client";

import AboutMeTab from "@/components/Tabs/AboutMeTab";
import TechnologiesTab from "@/components/Tabs/TechnologiesTab";
import { useEffect, useState } from "react";

export default function Home() {
  const [positions, setPositions] = useState({
    aboutMePosition: { x: 0, y: 0 },
    technologiesPosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const aboutMePosition = {
      x: screenWidth * 0.2,
      y: screenHeight * 0.2,
    };

    const technologiesPosition = {
      x: screenWidth * 0.6,
      y: screenHeight * 0.2,
    };

    setPositions({ aboutMePosition, technologiesPosition });
  }, []);

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="w-full flex justify-center items-center">
        <AboutMeTab defaultPosition={positions.aboutMePosition} />
        <TechnologiesTab defaultPosition={positions.technologiesPosition} />
      </section>
    </main>
  );
}
