import React from 'react';
import Chart from './components/SymbolTracker';

const symbol = ["FNGU", "MSFT", "AMZN"]

function App() {
  return (
    <div>
      <Chart 
        symbol={symbol[0]}
      />
    </div>
  );
}

export default App;
