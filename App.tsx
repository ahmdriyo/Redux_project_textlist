// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/App/store';
// import { App } from './src/index';

// const MainApp = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// export default MainApp;

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import ItemList from './src/components/ItemList';

const App = () => {
  return (
    <Provider store={store}>
      <ItemList />
    </Provider>
  );
};

export default App;
