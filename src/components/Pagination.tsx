import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  paginate: Dispatch<SetStateAction<number>>;
  totalCount: number;
};

const DEFAULT_PAGE_COUNT_PER_GROUP = 10;

const Pagination: FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  paginate,
  totalCount,
}) => {
  const [pageGroupIndex, setPageGroupIndex] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState<number[]>([]);
  const pageNumbers: number[] = [];
  const pageNumberClassName = `page-link relative block py-1.5 px-2 sm:px-3 rounded border-0
    bg-transparent outline-none transition-all duration-300 rounded text-gray-800 text-sm sm:text-lg
    hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`;
  const hiddenClassName = "hidden";
  const activeClassName =
    "active bg-zinc-300 shadow-sm focus:shadow-md rounded font-bold";

  const groupPageNumbers = (
    pageNumbersArr: number[],
    itemsPerGroup: number
  ) => {
    const groupCount = Math.ceil(pageNumbersArr.length / itemsPerGroup);
    return new Array(groupCount)
      .fill("")
      .map((_, index) =>
        pageNumbersArr.slice(index * itemsPerGroup, (index + 1) * itemsPerGroup)
      );
  };

  const getPageGroupIndex = (pagesArr: number[][], pageNumber: number) =>
    pagesArr.findIndex((pages) => pages.includes(pageNumber));

  for (
    let pageNumber = 1;
    pageNumber <= Math.ceil(totalCount / itemsPerPage);
    pageNumber++
  ) {
    pageNumbers.push(pageNumber);
  }

  const groupedPageNumbers = groupPageNumbers(
    pageNumbers,
    Math.min(pageNumbers.length, DEFAULT_PAGE_COUNT_PER_GROUP)
  );

  const onClickPageNumber = (pageNumber: number): void => {
    if (pageNumber === currentPage) {
      return;
    }
    paginate(pageNumber);
  };

  const onClickPreviousSetOfPages = (): void => {
    paginate((pageGroupIndex - 1) * DEFAULT_PAGE_COUNT_PER_GROUP + 1);
  };

  const onClickNextSetOfPages = (): void => {
    paginate((pageGroupIndex + 1) * DEFAULT_PAGE_COUNT_PER_GROUP + 1);
  };

  const onClickPreviousPage = (): void => {
    paginate(currentPage - 1);
  };

  const onClickNextPage = (): void => {
    paginate(currentPage + 1);
  };

  useEffect(() => {
    if (groupedPageNumbers.length - 1 >= pageGroupIndex) {
      setCurrentPageGroup(groupedPageNumbers[pageGroupIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageGroupIndex, totalCount]);

  useEffect(() => {
    const pageNumberIndex = getPageGroupIndex(groupedPageNumbers, currentPage);

    if (pageNumberIndex !== pageGroupIndex) {
      setPageGroupIndex(pageNumberIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-center bg-slate-50 bg-opacity-70 py-3 backdrop-blur-lg">
      <ul className="list-style-none flex">
        <li className="page-item" onClick={onClickPreviousSetOfPages}>
          <a
            className={`${pageNumberClassName} ${
              pageGroupIndex === 0 ? hiddenClassName : ""
            } px-1`}
            href="#"
            aria-label="Previous Set"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item" onClick={onClickPreviousPage}>
          <a
            className={`${pageNumberClassName} ${
              currentPage === 1 ? hiddenClassName : ""
            } px-1`}
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        {currentPageGroup.map((pageNumber) => (
          <li
            key={`page-${pageNumber}`}
            className={`page-item ${
              pageNumber === currentPage ? activeClassName : ""
            }`}
            onClick={() => {
              onClickPageNumber(pageNumber);
            }}
          >
            <a href="#" className={pageNumberClassName}>
              {pageNumber}
            </a>
          </li>
        ))}
        <li className="page-item" onClick={onClickNextPage}>
          <a
            className={`${pageNumberClassName} ${
              currentPage === pageNumbers.length ? hiddenClassName : ""
            } px-1`}
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
        <li className="page-item" onClick={onClickNextSetOfPages}>
          <a
            className={`${pageNumberClassName} ${
              pageGroupIndex === groupedPageNumbers.length - 1
                ? hiddenClassName
                : ""
            } px-1`}
            href="#"
            aria-label="Next Set"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
