import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

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
          <TooltipContent className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg font-medium text-white">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
