import React from 'react';
import Chart from './components/SymbolTracker';

const symbol = [
  "AAPL", "AMZN", "BABA",
  "BIDU", "TWTR", "GOOGL",
  "NFLX", "NVDA", "TSLA",
  "FB"
]
const charts = [];
for(let stock of symbol){
  charts.push(<Chart symbol={stock}/>)
}

function App() {
  return (
    <div>
      <h1>FNGU Tracker</h1>
      {charts}
    </div>
  );
}

export default App;
