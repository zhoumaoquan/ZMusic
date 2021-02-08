import { memo } from 'react';

import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import routers from '@/router'
import store from './store'
import ZAppHeader from '@/components/app-header';
import ZAppFooter from '@/components/app-footer';
import ZAppPlayerBar from '@/pages/player/app-player-bar'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ZAppHeader />
        {
          renderRoutes(routers)
        }
        <ZAppFooter />
        <ZAppPlayerBar />
      </HashRouter>
    </Provider>
  );
})
