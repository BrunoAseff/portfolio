// BottomNav.js

import { Code, User } from "phosphor-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

export default function BottomNav({ tabsState, onTabClick }) {
  return (
    <nav className="absolute gap-3 items-center justify-center bottom-6 flex bg-white/20 rounded-xl backdrop-blur-[30px] border border-white/40">
      <TooltipProvider delayDuration="50">
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => onTabClick("aboutMe")}
              className="p-3 text-md flex flex-col items-center justify-center gap-1 text-black cursor-pointer"
            >
              <User size={32} />
              {tabsState.aboutMe !== "closed" && (
                <span className="rounded-full w-1 h-1 bg-black"></span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white/20 mb-1 shadow-xl backdrop-blur-[30px] border border-white/40">
            <p>Sobre mim</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration="50">
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => onTabClick("technologies")}
              className="p-3 text-md flex flex-col items-center justify-center gap-1 text-black cursor-pointer"
            >
              <Code size={32} />
              {tabsState.technologies !== "closed" && (
                <span className="rounded-full w-1 h-1 bg-black"></span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white/20 mb-1 shadow-xl backdrop-blur-[30px] border border-white/40">
            <p>Habilidades</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  );
}
