import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function TechnologiesLogo({ iconColor, title, icon }) {
  return (
    <div>
      <TooltipProvider delayDuration="50">
        <Tooltip>
          <TooltipTrigger
            className={`${iconColor} backdrop-blur-[30px] cursor-default  p-2 rounded-xl`}
          >
            {icon}
          </TooltipTrigger>
          <TooltipContent className="bg-white/80 shadow-xl backdrop-blur-[30px] border border-white/40">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
