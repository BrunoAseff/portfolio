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

  return (
    <div className="grid grid-cols-2 max-w-[90%] gap-12 mt-auto mb-auto">
      {images.map((image, index) => (
        <div key={index} className="w-full">
          <Dialog className="flex flex-col items-left w-full">
            <DialogTrigger asChild>
              <div className="mt-auto mb-auto relative">
                <div className="w-[230px]">
                  <AspectRatio ratio={16 / 9}>
                    <div className="relative w-full h-full">
                      {!loadedImages[index] && (
                        <Skeleton className="absolute inset-0 bg-gray-100/40 rounded-xl" />
                      )}
                      <Image
                        loading="eager"
                        className={`rounded-xl hover:cursor-pointer transition-opacity duration-200 w-full h-full object-cover ${
                          loadedImages[index] ? "opacity-100" : "opacity-0"
                        }`}
                        src={image}
                        alt={imagesAlt?.[index] || ""}
                        width={230}
                        height={129} // Approximately 16:9 ratio of 230
                        onLoadingComplete={() => handleImageLoad(index)}
                      />
                    </div>
                  </AspectRatio>
                </div>
                <p className="mt-2 text-sm bg-slate-700/10 text-slate-700 p-2 border-[1px] rounded-full border-slate-700 w-fit">
                  {imagesAlt?.[index]}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[1024px] border-0 p-0 max-h-fit bg-transparent">
              <AspectRatio ratio={16 / 9}>
                <Image
                  loading="eager"
                  className="rounded-xl object-cover w-full h-full"
                  src={image}
                  alt={imagesAlt?.[index] || ""}
                  width={2100}
                  height={1181} // 16:9 ratio of 2100
                />
              </AspectRatio>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default ProjectImageGallery;
