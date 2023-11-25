import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { render } from 'react-dom';
import Layout from './containers/Layout';
import theme from './theme';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Message from './components/message/Message';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnMount: false,
    },
  },
})
render(
  <QueryClientProvider client={queryClient}>

    <ThemeProvider theme={theme} >
      <Message />

      <Layout />
    </ThemeProvider>
  </QueryClientProvider>
  , document.getElementById('root')
);