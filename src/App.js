import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import routers from './routers';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <IconStyle />
      <RouterProvider router={createBrowserRouter(routers)} />
    </Provider>
  );
}

export default App;
