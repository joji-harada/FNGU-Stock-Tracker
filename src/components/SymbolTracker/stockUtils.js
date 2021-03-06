import symbols from './symbols';
const API_KEY = process.env.REACT_APP_STOCK_KEY;

export default async function getAllStockData() {
  const stockDataBySymbol = {};
  const stockFetches = symbols.map(symbol => fetchStockData(symbol)); //dispatches all api requests simultaneously
  const allStockData = await Promise.all(stockFetches);
  allStockData.forEach(stockData => {
    stockDataBySymbol[stockData.symbol] = stockData;
  });
  getTopMover(stockDataBySymbol);
  
  return stockDataBySymbol;
}

async function fetchStockData(symbol) {
    const stockData = {   
        symbol: symbol,     
        xVals: [],
        yVals: [],
        color: '',
        changeOverTime: 0,
        isTopMover: false,
    };
    const today = getToday();
    const endpoint = getApiEndpoint(symbol, today);
    const response = await fetch(endpoint);
    const data = await response.json();

    let changeOverTime = 0;
    let tempVal = data[0].average;

    data.forEach((entry) => {
        stockData.xVals.push(entry.minute);
        stockData.yVals.push(entry.average);
        
        if(entry.average >= tempVal){
            changeOverTime += entry.average;
            tempVal = entry.average;
        } else if(entry.average < tempVal) {
            changeOverTime -= entry.average;
            tempVal = entry.average;
        }
    })

    stockData.changeOverTime = getAverage(changeOverTime, stockData.yVals.length);

    const yVals = stockData.yVals.filter(price => price !== null);

    const firstYVal = yVals[0];
    const lastYVal = yVals[yVals.length - 1];
    if(lastYVal >= firstYVal){
        stockData.color = 'green';
    } else {
        stockData.color = '#c42121';
    }
    
    return stockData;
}

function getApiEndpoint(symbol, today) {
    return `https://cloud.iexapis.com/stable/stock/${symbol}/chart/date/${today}?token=${API_KEY}`;
}

const getToday = () => {
    let date = new Date();
    //setting date to previous Friday if current date is weekend
    if(date.getDay() === 6){ //if it's sat
        date.setDate(date.getDate() - 1);
    } else if(date.getDay() === 0){ //if it's sun
        date.setDate(date.getDate() - 2);
    }

    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    return yyyy + mm + dd;
}

const getTopMover = (allStockData) => {
    let keys = Object.keys(allStockData);
    let tempTopChange = Math.abs(allStockData[keys[0]].changeOverTime);
    let curTopMoverSymbolData = {};

    for (let i = 1; i < keys.length; i++) {
        const curData = allStockData[keys[i]];
        if (tempTopChange < Math.abs(curData.changeOverTime)) {
        tempTopChange = Math.abs(curData.changeOverTime);
        curTopMoverSymbolData = curData;
        }
    }

    curTopMoverSymbolData.isTopMover = true;

    return allStockData;
}

export const sortTopMover = (stockData) => {
    const symbols = Object.keys(stockData);
    let res = [];
    for(let i = 1; i < symbols.length; i++){
        if(stockData[symbols[i]].isTopMover === true){
            res.unshift(symbols[i]);
        } else {
            res.push(symbols[i]);
        }

        // Add fngu as first item after list has been fully constructed
        if(i === symbols.length - 1) {
            res.unshift(symbols[0]);
        }
    }

  return res;
}

function getAverage(total, entries){
    return total / entries;
}