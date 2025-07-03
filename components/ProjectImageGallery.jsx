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
    <div className="grid grid-cols-2 max-w-[90%] gap-6 mt-auto mb-auto">
      {images.map((image, index) => (
        <div key={index} className="w-full">
          <Dialog>
            <DialogTrigger asChild>
              <div className="group cursor-pointer">
                <div className="w-[230px]">
                  <AspectRatio ratio={16 / 9}>
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 hover:border-white/30">
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
                        width={230}
                        height={129}
                        onLoadingComplete={() => handleImageLoad(index)}
                      />
                    </div>
                  </AspectRatio>
                </div>
                {imagesAlt?.[index] && (
                  <p className="mt-3 text-sm text-white bg-white/10  px-3 py-1.5 rounded-lg w-fit transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/30">
                    {imagesAlt[index]}
                  </p>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="bg-black/20 backdrop-blur-[100px] border-none max-w-[1024px] p-0 max-h-fit">
              <AspectRatio ratio={16 / 9}>
                <Image
                  loading="eager"
                  className="rounded-xl object-cover w-full h-full"
                  src={image}
                  alt={imagesAlt?.[index] || ""}
                  width={2100}
                  height={1181}
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