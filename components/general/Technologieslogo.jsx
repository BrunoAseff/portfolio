import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { cn } from '@/lib/utils';

export default function TechnologiesLogo({ title, icon, className }) {
  const baseClassName = "backdrop-blur-lg cursor-default p-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center";
  const combinedClassName = cn(baseClassName, className);
  
  return (
    <div className="flex-shrink-0">
      <TooltipProvider delayDuration="50">
        <Tooltip>
          <TooltipTrigger className={combinedClassName}>
            <div className="flex items-center justify-center w-full h-full">
              {icon}
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-black/10 backdrop-blur-lg border border-white/20 shadow-lg font-medium text-white">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
