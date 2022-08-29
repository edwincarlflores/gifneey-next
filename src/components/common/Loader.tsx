import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="custom-loader flex items-center justify-center">
      <div className="flex space-x-3 bg-transparent p-6 md:space-x-4">
        <div className="h-4 w-4 animate-bounce rounded-full bg-gray-400 md:h-8 md:w-8"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-gray-400 md:h-8 md:w-8"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-gray-400 md:h-8 md:w-8"></div>
      </div>
    </div>
  );
};

export default Loader;
