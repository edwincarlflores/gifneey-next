/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import NoResultIcon from "../../assets/images/no-result.png";
import ErrorIcon from "../../assets/images/error.png";

type FallbackProps = {
  error: boolean;
  resultCount: number;
  resultType: "trending" | "search" | "trending-home";
  searchQuery: string;
};

const Fallback: FC<FallbackProps> = ({
  error,
  resultCount,
  resultType,
  searchQuery,
}) => {
  const noResultMessage =
    resultType === "search"
      ? `No results were found for "${searchQuery}"`
      : "There are no trending posts found";
  let message = "Something went wrong with your request";
  let icon = ErrorIcon;

  if (resultCount <= 0 && !error) {
    message = noResultMessage;
    icon = NoResultIcon;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-4 flex justify-center space-x-4 px-6 text-gray-700 sm:space-x-12 sm:px-12">
        <img
          src={icon.src}
          alt="no-result-image"
          className="h-32 w-32 text-gray-700"
        />
        <div className="self-center overflow-hidden px-2 font-mono text-sm md:text-5xl">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Fallback;
