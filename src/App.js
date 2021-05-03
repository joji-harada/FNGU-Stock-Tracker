import React from 'react';
import Chart from './components/SymbolTracker';

const symbols = [
  "AAPL", "AMZN", "BABA",
  "BIDU", "TWTR", "GOOGL",
  "NFLX", "NVDA", "TSLA",
  "FB"
]

function App() {
  return (
    <div>
      <h1>FNGU Tracker</h1>
      <Chart symbol='FNGU' />
      {
        symbols.map((symbol, index) => {
          return <Chart key={index} symbol={symbol} />
        })
      }
    </div>
  );
}

export default App;
