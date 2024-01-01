import Head from "next/head";

interface Props {
  title: string;
}

export default function Meta({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key={title} />
      <meta
        name="description"
        content="Vote on Youtube videos. Create a tournament bracket with just a Youtube playlist url or play a featured bracket."
      />
      <meta
        property="og:description"
        content="Vote on Youtube videos. Create a tournament bracket with just a Youtube playlist url or play a featured bracket."
      />
      <link rel="icon" href="/favicon.ico"></link>
      <meta name="author" content="Brandon Carlisle"></meta>
    </Head>
  );
}
