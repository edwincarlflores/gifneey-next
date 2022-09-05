import { FC, useEffect, useState } from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import Pagination from "../components/Pagination";
import Loader from "../components/common/Loader";
import Fallback from "../components/common/Fallback";
import { useSearchResultsQuery, useTrendingGIFsQuery } from "../hooks/queries";
import type { IGifData } from "../interfaces/giphy.interface";

type ResultType = "trending" | "search" | "trending-home";

type HeadingProps = {
  rangeStart: number;
  rangeEnd: number;
  total: number;
  type: ResultType;
};

const DEFAULT_PAGE_RESULT_COUNT = 50;
const DEFAULT_MAX_OFFSET = 4999;

const Home: NextPage = () => {
  const [data, setData] = useState<IGifData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageResultCount, setPageResultCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultType, setResultType] = useState<ResultType>("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [resetPageNumber, setResetPageNumber] = useState(false);

  const Heading: FC<HeadingProps> = ({ rangeStart, rangeEnd, total, type }) => {
    return (
      <>
        <div className="flex justify-center font-mono text-5xl text-gray-700">{`${
          type === "search" ? searchQuery : "Trending"
        }`}</div>
        <div className="flex justify-center pt-2 pb-8 text-lg text-gray-700">{`${rangeStart} - ${rangeEnd} of ${total} results`}</div>
      </>
    );
  };

  const {
    isFetching: isFetchingTrending,
    isLoading: isLoadingTrending,
    isError: isErrorTrending,
  } = useTrendingGIFsQuery(
    { offset, limit: DEFAULT_PAGE_RESULT_COUNT, resultType },
    {
      onSuccess(data) {
        setData(data.data);
        setTotalCount(data.pagination.total_count);
        setPageResultCount(data.pagination.count);
        setPageOffset(data.pagination.offset);

        if (resetPageNumber) {
          setCurrentPage(1);
        }
      },
    }
  );

  const {
    isFetching: isFetchingSearchResults,
    isLoading: isLoadingSearchResults,
    isError: isErrorSearchResults,
  } = useSearchResultsQuery(
    {
      searchQuery,
      offset,
      limit: DEFAULT_PAGE_RESULT_COUNT,
      resultType,
    },
    {
      onSuccess(data) {
        setData(data.data);
        setTotalCount(data.pagination.total_count);
        setPageResultCount(data.pagination.count);
        setPageOffset(data.pagination.offset);

        if (resetPageNumber) {
          setCurrentPage(1);
        }
      },
    }
  );

  useEffect(() => {
    if (searchQuery) {
      setResultType("search");
      setOffset(0);
      setResetPageNumber(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    setOffset(
      Math.min(
        (currentPage - 1) * DEFAULT_PAGE_RESULT_COUNT,
        DEFAULT_MAX_OFFSET
      )
    );
    setResetPageNumber(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (resultType === "trending-home") {
      setResultType("trending");
      setOffset(0);
      setResetPageNumber(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultType]);

  if (
    (resultType === "search" &&
      (isLoadingSearchResults || isFetchingSearchResults)) ||
    (resultType !== "search" && (isLoadingTrending || isFetchingTrending))
  ) {
    return (
      <Layout setResultType={setResultType} setSearchQuery={setSearchQuery}>
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (
    (resultType === "search" && isErrorSearchResults) ||
    (resultType !== "search" && isErrorTrending) ||
    totalCount === 0
  ) {
    return (
      <Layout setResultType={setResultType} setSearchQuery={setSearchQuery}>
        <Fallback
          error={
            resultType === "search" ? isErrorSearchResults : isErrorTrending
          }
          resultCount={totalCount}
          resultType={resultType}
          searchQuery={searchQuery}
        />
      </Layout>
    );
  }

  return (
    <Layout setResultType={setResultType} setSearchQuery={setSearchQuery}>
      <div className="my-12 pb-32 pt-12">
        <Heading
          rangeStart={pageOffset + 1}
          rangeEnd={pageOffset + pageResultCount}
          total={Math.min(totalCount, DEFAULT_MAX_OFFSET + 1)}
          type={resultType}
        />
        <Gallery images={data} />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={DEFAULT_PAGE_RESULT_COUNT}
          paginate={setCurrentPage}
          totalCount={Math.min(totalCount, DEFAULT_MAX_OFFSET + 1)}
        />
      </div>
    </Layout>
  );
};

export default Home;
