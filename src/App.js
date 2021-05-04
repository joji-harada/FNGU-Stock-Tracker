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
      <div className='ui container'>
        <h1>FNGU Tracker</h1>
        <Chart symbol='FNGU' />
        <div className="ui grid">
          {
            symbols.map((symbol, index) => {
              return <Chart className='five wide column' key={index} symbol={symbol} />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
