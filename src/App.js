import React from 'react';
import Chart from './components/SymbolTracker';
import './App.css';
import getAllStockData, { sortTopMover } from './components/SymbolTracker/stockUtils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: {},
      symbols: [],
      etfSymbol: '',
    }
  }

  async componentDidMount() {
    const stockData = await getAllStockData();
    const symbols = Object.keys(stockData);
    const etfSymbol = symbols[0];
    this.setState({stockData, symbols, etfSymbol});
  }

  render() {
    const {symbols, stockData, etfSymbol} = this.state;
    const sortedSymbols = sortTopMover(stockData, symbols);
    console.log('data: ', stockData, '\nETF: ',  etfSymbol, '\nSorted Symbols: ', sortedSymbols);
    return (
      <div>
        <div className='ui container'>
          <h1>{etfSymbol} Tracker</h1>
          <div className="ui grid">  
            {/* <Chart className="wide-chart" symbol={etfSymbol} data={stockData[etfSymbol]} /> */}
            {
              sortedSymbols.map((symbol, index) => {
                const chartClass = symbol === etfSymbol || stockData[symbol].isTopMover
                  ? 'wide-chart'
                  : 'five wide column chart'; 

                return <Chart className={`${chartClass}`} key={index} symbol={symbol} data={stockData[symbol]} />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
