import React from 'react';
import Chart from './components/SymbolTracker';
import './App.css';
import getAllStockData, { sortTopMover } from './components/SymbolTracker/stockUtils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: {},
      etfSymbol: '',
    }
  }

  async componentDidMount() {
    const stockData = await getAllStockData();
    const symbols = Object.keys(stockData);
    const etfSymbol = symbols[0];
    this.setState({stockData, etfSymbol});
  }

  render() {
    const {stockData, etfSymbol} = this.state;
    const sortedSymbols = sortTopMover(stockData);
    console.log('data: ', stockData, '\nETF: ',  etfSymbol, '\nSorted Symbols: ', sortedSymbols);
    return (
      <div>
        <div className='ui container'>
          <h1>{etfSymbol} Tracker</h1>
          <div className="ui grid">  
            {
              sortedSymbols.map((symbol, index) => {
                const symbolData = stockData[symbol];
                const {isTopMover} = symbolData;
                const chartClass = symbol === etfSymbol || isTopMover
                  ? 'wide-chart'
                  : 'five wide column chart'; 

                const topMoverText = isTopMover ? 'Top Mover: ' : '';

                return (
                  <Chart
                    topMoverText={`${topMoverText}`}
                    className={`${chartClass}`}
                    key={index}
                    symbol={symbol}
                    data={symbolData}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
