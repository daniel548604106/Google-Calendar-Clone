import '../styles/globals.css';

import React, { useContext } from 'react';

import EventModal from '../components/EventModal';
import ContextWrapper from '../context/ContextWrapper';
import GlobalContext from '../context/GlobalContext';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps, router }: AppProps) {
  const { showEventModal } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <Component {...pageProps} />
      {showEventModal && <EventModal />}
    </React.Fragment>
  );
}

function AppWrapper({ Component, pageProps, router }: AppProps) {
  return (
    <ContextWrapper>
      <MyApp router={router} Component={Component} pageProps={pageProps} />
    </ContextWrapper>
  );
}

export default AppWrapper;
