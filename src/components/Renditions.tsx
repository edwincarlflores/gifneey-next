/* eslint-disable @next/next/no-img-element */
import { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import useKeypress from "../hooks/useKeypress";
import type { IImages } from "../interfaces/giphy.interface";
import { toTitleCase } from "../utils/StringUtils";
import { download } from "../utils/FileUtils";

type RenditionsProps = {
  renditions: IImages | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  username: string;
};

type RenditionType =
  | "original"
  | "hd"
  | "fixed_height"
  | "fixed_width"
  | "downsized"
  | "preview_gif";

const renditionTypes: RenditionType[] = [
  "original",
  "preview_gif",
  "fixed_height",
  "fixed_width",
  "downsized",
  "hd",
];

const videoRenditions: RenditionType[] = ["hd"];

const Renditions: FC<RenditionsProps> = ({
  renditions,
  open,
  setOpen,
  title,
  username,
}) => {
  const [openTab, setOpenTab] = useState<RenditionType>("original");
  const [tabKeys, setTabKeys] = useState<RenditionType[]>([]);

  useEffect(() => {
    const keys = renditions ? Object.keys(renditions) : [];
    const renditionTabKeys = renditionTypes.filter((type) =>
      keys.includes(type)
    );

    setTabKeys(renditionTabKeys);
  }, [renditions]);

  useKeypress("Escape", () => {
    if (open) {
      setOpen(false);
    }
  });

  const RenditionTabs: FC = () => {
    return (
      <ul
        className="rendition-tab z-40 mx-4 flex cursor-pointer list-none flex-row flex-wrap pt-3 pb-4"
        role="tablist"
        id="tabs-tab"
      >
        {tabKeys.map((tabKey) => (
          <li
            key={`${tabKey}-tab`}
            className="mr-2 flex-auto text-center last:mr-0"
          >
            <div
              className={
                "block rounded px-5 py-3 text-xs font-bold uppercase leading-normal shadow-lg " +
                (tabKey === openTab
                  ? "bg-white text-gray-900"
                  : "bg-black text-white")
              }
              onClick={(event) => {
                event.preventDefault();
                setOpenTab(tabKey);
              }}
              data-toggle="tab"
              role="tablist"
            >
              {`${
                tabKey === "preview_gif"
                  ? toTitleCase("preview", "_")
                  : toTitleCase(tabKey, "_")
              }`}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={open ? "preview-modal open" : "preview-modal"}>
      <RenditionTabs />
      <svg
        className="close-icon z-50 h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setOpen(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      {videoRenditions.includes(openTab) ? (
        <video
          src={renditions?.[openTab]?.mp4}
          autoPlay
          loop
          muted
          height={renditions?.[openTab]?.height}
          width={renditions?.[openTab]?.width}
          className="z-30"
        ></video>
      ) : (
        <img
          src={renditions?.[openTab]?.url || ""}
          height={renditions?.[openTab]?.height}
          width={renditions?.[openTab]?.width}
          alt={title}
          className="z-30"
        />
      )}

      <div className="fixed bottom-[152px] z-40 mt-2">
        <button
          className={
            "block rounded bg-white px-5 py-3 text-xs font-bold uppercase leading-normal text-gray-900 shadow-lg"
          }
          onClick={() => {
            const fileExtension = videoRenditions.includes(openTab)
              ? "mp4"
              : "gif";

            download(
              renditions?.[openTab]?.[
                `${fileExtension === "mp4" ? "mp4" : "url"}`
              ],
              `${title}_${openTab}.${fileExtension}`
            );
          }}
        >
          Download
        </button>
      </div>

      <div className="fixed bottom-0 z-40 mx-12 h-32 w-full bg-transparent px-8 sm:h-28">
        <div className="font-sm md:font-xl text-2xl font-bold text-white">
          {title}
        </div>
        {username && (
          <p className="mt-1 text-base leading-tight text-gray-400 ">
            {username}
          </p>
        )}
      </div>
    </div>
  );
};

export default Renditions;
