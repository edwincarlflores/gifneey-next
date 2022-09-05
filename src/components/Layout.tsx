import { FC, Dispatch, SetStateAction } from "react";
import Head from "next/head";
import Navbar from "./Navbar";

type ResultType = "trending" | "search" | "trending-home";

interface LayoutProps {
  children: React.ReactNode;
  setResultType: Dispatch<SetStateAction<ResultType>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const SEOWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <Head>
      <title>Gifneey</title>
      <link rel="icon" href="/gifneey-logo.png" />
      <meta
        name="description"
        title="description"
        content="Search, preview and download GIFs of different sizes"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
    </Head>
    <main className="min-h-screen">{children}</main>
  </div>
);

const Layout: FC<LayoutProps> = ({
  children,
  setResultType,
  setSearchQuery,
}) => {
  return (
    <SEOWrapper>
      <div className="bg-slate-50">
        <Navbar setResultType={setResultType} setSearchQuery={setSearchQuery} />
        <div className="container mx-auto h-screen max-w-fit p-6 md:p-6 lg:px-24 lg:py-20">
          {children}
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Layout;
