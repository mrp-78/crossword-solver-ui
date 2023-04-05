import Head from 'next/head'
import DemoContainer from "components/Demo";
import {crosswordsProps} from "common/types";
import crosswords from "pages/demo/crosswords";

export type DemoProps = {
  crosswords: crosswordsProps;
}

export default function Demo({crosswords}: DemoProps) {
  return (
    <>
      <Head>
        <title>جدول‌باز | دمو</title>
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

  return {
    props: {
      crosswords,
    },
    revalidate: 60 * 60,
  }
}
