import { FC, useState } from "react";
import type { NextPage } from "next";
import { useAtom } from "jotai";
import {
  searchQueryAtom,
  resultTypeAtom,
  offsetAtom,
  resetPageNumberAtom,
  changePageAtom,
} from "../atoms";
import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import Pagination from "../components/Pagination";
import Loader from "../components/common/Loader";
import Fallback from "../components/common/Fallback";
import { useSearchResultsQuery, useTrendingGIFsQuery } from "../hooks/queries";
import { DEFAULT_PAGE_RESULT_COUNT, DEFAULT_MAX_OFFSET } from "../constants";
import type { IGifData } from "../interfaces/giphy.interface";

export type ResultType = "trending" | "search";

type HeadingProps = {
  rangeStart: number;
  rangeEnd: number;
  total: number;
  type: ResultType;
};

type StatusIndicators = {
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
};

type StatusIndicatorsByResult = {
  [key in ResultType]: StatusIndicators;
};

const Home: NextPage = () => {
  const [data, setData] = useState<IGifData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageResultCount, setPageResultCount] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);

  const [searchQuery] = useAtom(searchQueryAtom);
  const [resultType] = useAtom(resultTypeAtom);
  const [offset] = useAtom(offsetAtom);
  const [resetPageNumber] = useAtom(resetPageNumberAtom);
  const [, changePage] = useAtom(changePageAtom);

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
          changePage(1);
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
          changePage(1);
        }
      },
    }
  );

  const STATUS_INDICATORS: StatusIndicatorsByResult = {
    trending: {
      isFetching: isFetchingTrending,
      isLoading: isLoadingTrending,
      isError: isErrorTrending,
    },
    search: {
      isFetching: isFetchingSearchResults,
      isLoading: isLoadingSearchResults,
      isError: isErrorSearchResults,
    },
  };

  if (
    STATUS_INDICATORS[resultType].isLoading ||
    STATUS_INDICATORS[resultType].isFetching
  ) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (STATUS_INDICATORS[resultType].isError || totalCount === 0) {
    return (
      <Layout>
        <Fallback
          error={STATUS_INDICATORS[resultType].isError}
          resultCount={totalCount}
          resultType={resultType}
          searchQuery={searchQuery}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="my-12 pb-32 pt-12">
        <Heading
          rangeStart={pageOffset + 1}
          rangeEnd={pageOffset + pageResultCount}
          total={Math.min(totalCount, DEFAULT_MAX_OFFSET + 1)}
          type={resultType}
        />
        <Gallery images={data} />
        <Pagination
          itemsPerPage={DEFAULT_PAGE_RESULT_COUNT}
          totalCount={Math.min(totalCount, DEFAULT_MAX_OFFSET + 1)}
        />
      </div>
    </Layout>
  );
};

export default Home;
