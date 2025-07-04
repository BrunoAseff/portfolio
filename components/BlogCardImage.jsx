"use client";

import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardImage = ({ src, alt, width = 350, height = 200 }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-[300px] rounded-sm bg-cover overflow-hidden h-[200px]   relative">
      {isLoading && <Skeleton className="absolute inset-0 bg-gray-100/40" />}
      <Image
        className={`shadow-2xl group-hover:scale-105 shadow-black  transition-all duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
