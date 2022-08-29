import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import type { IGifData } from "../interfaces/giphy.interface";

type ThumbnailProps = {
  image: IGifData;
  index: number;
};

const Thumbnail: FC<ThumbnailProps> = ({ image, index }) => {
  const userDisplayName = image.user?.display_name || image.username;
  let imageCardClassName =
    "overflow-hidden rounded shadow-lg cursor-pointer break-inside hover:bg-zinc-600 hover:shadow-none hover:text-white";

  if (index !== 0) {
    imageCardClassName += " my-4";
  }

  return (
    <div className={imageCardClassName}>
      <LazyLoadImage
        src={image.images.fixed_width_still.url}
        alt={image.title}
        width="100%"
        height={image.images.fixed_width_still.height}
        effect="blur"
        className="z-0"
      />
      <div className="px-6 py-4 ">
        <div className="font-mono text-base font-medium leading-tight">
          {image.title}
        </div>
        {userDisplayName && (
          <p className="mt-1 text-base leading-tight text-gray-400">
            {userDisplayName}
          </p>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
