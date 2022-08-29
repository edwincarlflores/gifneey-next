import { Dispatch, FC, SetStateAction, useRef, useState } from "react";

type SearchFieldProps = {
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const SearchField: FC<SearchFieldProps> = ({ setSearchQuery }) => {
  const [fieldValue, setFieldValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative text-gray-400">
      <input
        type="text"
        name="search-field"
        className="w-full rounded-md bg-zinc-200 bg-opacity-70 py-2 pl-10 text-sm text-gray-700 backdrop-blur-lg focus:outline-none"
        placeholder="Search"
        value={fieldValue}
        ref={inputRef}
        onChange={(event) => {
          setFieldValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && fieldValue) {
            setSearchQuery(fieldValue);

            if (inputRef?.current) {
              inputRef?.current?.blur();
            }
          }
        }}
        onFocus={(event) => {
          if (fieldValue) {
            event.target.select();
          }
        }}
      />
      <span className="absolute inset-y-0 flex items-center pr-2">
        <button
          type="submit"
          className="focus:shadow-outline p-1 focus:outline-none"
          onClick={(event) => {
            event.preventDefault();
            if (fieldValue) {
              setSearchQuery(fieldValue);
            }
          }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="h-6 w-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
    </div>
  );
};

export default SearchField;
