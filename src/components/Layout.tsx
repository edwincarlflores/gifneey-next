import { FC, useEffect, useState } from "react";
import Gallery from "./Gallery";
import Navbar from "./Navbar";
import Fallback from "./common/Fallback";
import Pagination from "./Pagination";
import Loader from "./common/Loader";
import GiphyService from "../services/giphy.service";
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

const Layout: FC = () => {
  const [data, setData] = useState<IGifData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageResultCount, setPageResultCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultType, setResultType] = useState<ResultType>("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const giphyApi = GiphyService.getInstance();

  const getGifs = async (
    type: ResultType,
    offset = 0,
    resetPageNumber = true
  ) => {
    try {
      setLoading(true);
      setError(false);

      const results =
        type === "search"
          ? await giphyApi.getSearchResults(searchQuery, {
              offset,
              limit: DEFAULT_PAGE_RESULT_COUNT,
            })
          : await giphyApi.getTrendingGifs({
              offset,
              limit: DEFAULT_PAGE_RESULT_COUNT,
            });

      setData(results.data.data);
      setTotalCount(results.data.pagination.total_count);
      setPageResultCount(results.data.pagination.count);
      setResultType(type);
      setLoading(false);

      if (resetPageNumber) {
        setCurrentPage(1);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

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

  useEffect(() => {
    if (searchQuery) {
      getGifs("search");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    getGifs(
      resultType,
      Math.min(
        (currentPage - 1) * DEFAULT_PAGE_RESULT_COUNT,
        DEFAULT_MAX_OFFSET
      ),
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (resultType === "trending-home") {
      getGifs("trending");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultType]);

  return (
    <div className="bg-slate-50">
      <Navbar setResultType={setResultType} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto h-screen max-w-fit p-6 md:p-6 lg:px-24 lg:py-20">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="my-12 pb-32 pt-12">
            {totalCount > 0 && !error ? (
              <>
                <Heading
                  rangeStart={(currentPage - 1) * DEFAULT_PAGE_RESULT_COUNT + 1}
                  rangeEnd={
                    (currentPage - 1) * DEFAULT_PAGE_RESULT_COUNT +
                    pageResultCount
                  }
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
              </>
            ) : (
              <Fallback
                error={error}
                resultCount={totalCount}
                resultType={resultType}
                searchQuery={searchQuery}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
