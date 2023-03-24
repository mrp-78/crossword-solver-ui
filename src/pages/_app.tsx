import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import MuiRTL from "common/components/MuiRTL";
import createEmotionCache from "common/components/createEmotionCache";

const client = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, refetchOnMount: false } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client} contextSharing>
      <MuiRTL cacheRtl={createEmotionCache()}>
        <Component {...pageProps} />
      </MuiRTL>
    </QueryClientProvider>
  )
}
