import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectImageGallery = ({ images, imagesAlt }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const getGridConfig = (count) => {
    if (count === 1) {
      return {
        gridCols: "grid-cols-1",
        maxWidth: "max-w-md",
        imageWidth: "w-full",
        justify: "justify-center",
      };
    } else if (count === 2) {
      return {
        gridCols: "grid-cols-1 sm:grid-cols-2",
        maxWidth: "max-w-2xl",
        imageWidth: "w-full",
        justify: "justify-center",
      };
    } else if (count === 3) {
      return {
        gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        maxWidth: "max-w-4xl",
        imageWidth: "w-full",
        justify: "justify-center",
      };
    } else if (count <= 4) {
      return {
        gridCols: "grid-cols-1 sm:grid-cols-2",
        maxWidth: "max-w-3xl",
        imageWidth: "w-full",
        justify: "justify-center",
      };
    } else if (count <= 6) {
      return {
        gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        maxWidth: "max-w-5xl",
        imageWidth: "w-full",
        justify: "justify-center",
      };
    } else {
      return {
        gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        maxWidth: "max-w-7xl",
        imageWidth: "w-full",
        justify: "justify-center",
      };
    }
  };

  const config = getGridConfig(images.length);

  return (
    <div className={`w-full flex ${config.justify} mt-auto mb-auto`}>
      <div className={`${config.maxWidth} w-full px-4`}>
        <div className={`grid ${config.gridCols} gap-4 sm:gap-6`}>
          {images.map((image, index) => (
            <div key={index} className={`${config.imageWidth}`}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer">
                    <div className="w-full">
                      <AspectRatio ratio={16 / 9}>
                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:border-white/30 shadow-lg hover:shadow-xl">
                          {!loadedImages[index] && (
                            <Skeleton className="absolute inset-0 bg-white/20 rounded-xl" />
                          )}
                          <Image
                            loading="eager"
                            className={`transition-all duration-300 w-full h-full object-cover group-hover:scale-105 ${
                              loadedImages[index] ? "opacity-100" : "opacity-0"
                            }`}
                            src={image}
                            alt={imagesAlt?.[index] || ""}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            onLoad={() => handleImageLoad(index)}
                          />
                        </div>
                      </AspectRatio>
                    </div>
                    {imagesAlt?.[index] && (
                      <p className="mt-3 text-sm text-white bg-white/10 px-3 py-1.5 rounded-lg w-fit transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/30">
                        {imagesAlt[index]}
                      </p>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black/20 backdrop-blur-[100px] border-none max-w-[90vw] max-h-[90vh] p-0 w-fit h-fit">
                  <div className="relative w-full h-full">
                    <Image
                      loading="eager"
                      className="rounded-xl object-contain w-full h-full max-w-[85vw] max-h-[85vh]"
                      src={image}
                      alt={imagesAlt?.[index] || ""}
                      width={2100}
                      height={1181}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectImageGallery;
