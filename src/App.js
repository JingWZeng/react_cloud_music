import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routers from './routers';

function App() {
  return (
    <>
      <GlobalStyle />
      <IconStyle />
      <RouterProvider router={createBrowserRouter(routers)} />
    </>
  );
}

export default App;
