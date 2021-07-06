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

  getDate(){
    let date = new Date();
    //setting date to previous Friday if current date is weekend
    if(date.getDay() === 6){ //if it's sat
        date.setDate(date.getDate() - 1);
    } else if(date.getDay() === 0){ //if it's sun
        date.setDate(date.getDate() - 2);
    }

    date = date.toLocaleString();
    return date.split(',')[0]
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

    return (
      <div>
        <div className='ui container'>
          <h1 className='mainHeadline'>{etfSymbol} Tracker - Dataset for {this.getDate()}</h1>
          <div className="ui grid">  
            {
              sortedSymbols.map((symbol, index) => {
                const symbolData = stockData[symbol];
                const {isTopMover} = symbolData;
                const chartClass = symbol === etfSymbol || isTopMover
                  ? 'wide-chart'
                  : 'chart'; 

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
