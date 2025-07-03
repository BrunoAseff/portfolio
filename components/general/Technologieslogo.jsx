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
            className={`${iconColor} text-white/75 backdrop-blur-[100px] border border-white/10 bg-black/5 cursor-default  p-3 rounded-xl`}
          >
            {icon}
          </TooltipTrigger>
          <TooltipContent className="bg-white/20 font-medium text-white shadow-xl backdrop-blur-[30px] border border-white/40">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
