import Head from 'next/head'
import HomeContainer from "../components/Home";


export default function Home() {
  return (
    <>
      <Head>
        <title>جدول‌باز</title>
      </Head>
      <main>
        <HomeContainer />
      </main>
    </>
  )
}
