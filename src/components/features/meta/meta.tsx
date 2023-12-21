import Head from "next/head";

interface Props {
  title: string;
}

export default function Meta({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key={title} />
    </Head>
  );
}
