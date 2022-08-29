/* eslint-disable @next/next/no-img-element */
import { Dispatch, FC, SetStateAction } from "react";
import SearchField from "./SearchField";
import GifneeyLogo from "../assets/images/gifneey-logo.png";

type ResultType = "trending" | "search" | "trending-home";

type NavbarProps = {
  setResultType: Dispatch<SetStateAction<ResultType>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const Navbar: FC<NavbarProps> = ({ setResultType, setSearchQuery }) => {
  return (
    <nav className="fixed inset-x-0 z-50 bg-zinc-100 bg-opacity-70 shadow-lg backdrop-blur-lg">
      <div className="mx-auto max-w-full px-4">
        <div className="flex items-center sm:space-x-4 sm:px-3">
          <div
            className="font-bold text-gray-700 hover:text-gray-900"
            onClick={() => {
              setSearchQuery("");
              setResultType("trending-home");
            }}
          >
            <a href="#" className="flex items-center">
              <img src={GifneeyLogo.src} className="h-12 w-12" alt="Gifneey" />
              <span className="hidden font-mono text-lg sm:block">Gifneey</span>
            </a>
          </div>

          <div className="grow p-4">
            <div className="w-full md:w-1/2">
              <SearchField setSearchQuery={setSearchQuery} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
