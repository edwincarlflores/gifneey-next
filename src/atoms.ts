import { atom } from "jotai";
import type { ResultType } from "./pages/index";
import { DEFAULT_PAGE_RESULT_COUNT, DEFAULT_MAX_OFFSET } from "./constants";

interface ResultState {
  resultType: ResultType;
  offset: number;
  resetPageNumber: boolean;
}

export const searchQueryAtom = atom("");

export const currentPageAtom = atom(1);

export const resultStateAtom = atom<ResultState>({
  resultType: "trending",
  offset: 0,
  resetPageNumber: false,
});

// READ-ONLY DERIVED ATOMS FROM resultStateAtom
export const resultTypeAtom = atom((get) => get(resultStateAtom).resultType);
export const offsetAtom = atom((get) => get(resultStateAtom).offset);
export const resetPageNumberAtom = atom(
  (get) => get(resultStateAtom).resetPageNumber
);

//WRITE-ONLY ATOMS
export const triggerSearchAtom = atom(null, (get, set, searchQuery: string) => {
  set(searchQueryAtom, searchQuery);

  set(resultStateAtom, {
    ...get(resultStateAtom),
    resultType: "search",
    offset: 0,
    resetPageNumber: true,
  });
});

export const changePageAtom = atom(null, (get, set, newPage: number) => {
  set(currentPageAtom, newPage);

  set(resultStateAtom, {
    ...get(resultStateAtom),
    offset: Math.min(
      (get(currentPageAtom) - 1) * DEFAULT_PAGE_RESULT_COUNT,
      DEFAULT_MAX_OFFSET
    ),
    resetPageNumber: false,
  });
});

export const clickHomeAtom = atom(null, (get, set) => {
  set(resultStateAtom, {
    ...get(resultStateAtom),
    resultType: "trending",
    offset: 0,
    resetPageNumber: true,
  });

  set(searchQueryAtom, "");
});
