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

    stockData.changeOverTime = changeOverTime;

    if(changeOverTime >= 0){
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
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    return yyyy + mm + dd;
}

const getTopMover = (allStockData) => { //utilized in getAllStockData
    let keys = Object.keys(allStockData);
    let tempTopChange = Math.abs(allStockData[keys[0]].changeOverTime);
    allStockData[keys[0]].isTopMover = true;

    for (let i = 1; i < keys.length; i++) {
        if (tempTopChange < Math.abs(allStockData[keys[i]].changeOverTime)) {
        tempTopChange = Math.abs(allStockData[keys[i]].changeOverTime);
        allStockData[keys[i - 1]].isTopMover = false;
        allStockData[keys[i]].isTopMover = true;
        }
    }

    return allStockData;
}

export const sortTopMover = (stockData, symbols) => {
    let res = [];
    for(let i = 1; i < symbols.length; i++){
        if(stockData[symbols[i]].isTopMover === true){
        res.unshift(symbols[i]);
        } else {
        res.push(symbols[i]);
        }
    }

  return res;
}