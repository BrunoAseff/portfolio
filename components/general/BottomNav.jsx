import { Code, User } from "phosphor-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function BottomNav() {
  return (
    <>
      <nav className="absolute gap-3 items-center justify-center bottom-6 flex bg-white/20 rounded-xl  backdrop-blur-[30px] border border-white/40">
        <TooltipProvider delayDuration="50">
          <Tooltip>
            <TooltipTrigger>
              <a
                href="/"
                className="p-3 text-md flex flex-col items-center justify-center gap-1 text-black"
              >
                <User size={32} />
                <div className="rounded-full w-1 h-1 bg-black"></div>
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-white/20 mb-1 shadow-xl backdrop-blur-[30px] border border-white/40">
              <p>Sobre mim</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration="50">
          <Tooltip>
            <TooltipTrigger>
              <a
                href="/"
                className="p-3 text-md flex flex-col items-center justify-center gap-1 text-black"
              >
                <Code size={32} />
                <div className="rounded-full w-1 h-1 bg-black"></div>
              </a>
            </TooltipTrigger>
            <TooltipContent className="bg-white/20 mb-1 shadow-xl backdrop-blur-[30px] border border-white/40">
              <p>Tecnologias</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  );
}
