import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';

const rtlTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'dana',
  },
});

type MuiRTLProps = {
  children: React.ReactNode;
  cacheRtl?: EmotionCache;
};

const MuiRTL: React.FC<MuiRTLProps> = ({ children, cacheRtl }) => (
  // @ts-ignore
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={rtlTheme}>
      <CssBaseline />
      <div dir="rtl" style={{ direction: 'rtl', height: '100%', overflowY: 'auto' }}>
        {children}
      </div>
    </ThemeProvider>
  </CacheProvider>
);

export default MuiRTL;
