import type { NextPage } from "next";
import Head from "next/head";

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

const Home: NextPage = () => {
  return (
    <SEOWrapper>
      <h1 className="text-3xl font-bold underline">Gifneey Next!</h1>
    </SEOWrapper>
  );
};

export default Home;
