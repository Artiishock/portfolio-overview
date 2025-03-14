import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PortfolioOverview from './components/PortfolioOverview';
import './websocket'; 

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Portfolio Overview</h1>
        <PortfolioOverview />
      </div>
    </Provider>
  );
};

export default App;