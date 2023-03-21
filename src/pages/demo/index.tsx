import Head from 'next/head'
import DemoContainer from "components/Demo";
import {crosswordsProps} from "common/types";

export type DemoProps = {
  crosswords: crosswordsProps;
}

export default function Demo({crosswords}: DemoProps) {
  return (
    <>
      <Head>
        <title>جدول‌باز</title>
      </Head>
      <main>
        <DemoContainer crosswords={crosswords} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  // TODO connect to API
  // const res = await fetch('https://.../posts')
  const crosswords = [
    {
      value: 'جدول شماره ۱',
      key: 'crossword_01'
    },
    {
      value: 'جدول شماره ۲',
      key: 'crossword_02'
    },
    {
      value: 'جدول شماره ۳',
      key: 'crossword_03'
    }
  ]

  return {
    props: {
      crosswords,
    },
    revalidate: 60 * 60,
  }
}
