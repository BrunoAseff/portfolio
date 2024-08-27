import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function TechnologiesLogo({ color, title, icon }) {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={`${color}  p-2 rounded-xl`}>
            {icon}
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
