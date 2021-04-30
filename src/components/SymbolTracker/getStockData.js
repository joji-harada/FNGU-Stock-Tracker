const API_KEY = process.env.REACT_APP_STOCK_KEY;
const TIME_GRANULARITY = '5min';
const TIME_SERIES = `Time Series (${TIME_GRANULARITY})`;
const TIME_POINT = {
    OPEN: '1. open',
    HIGH: '2. high',
    LOW: '3. low',
    CLOSE: '4. close',
    VOLUME: '5. volume',
};
const SELECTED_TIME = TIME_POINT.OPEN;

export default async function getStockData(symbol) {
    const stockData = {
        xVals: [],
        yVals: [],
    };
    const endpoint = getApiEndpoint(symbol);
    const response = await fetch(endpoint);
    const data = await response.json();
    const timeSeries = data[TIME_SERIES];

    for(var timeStamp in timeSeries){
        stockData.xVals.push(timeStamp);
        stockData.yVals.push(timeSeries[timeStamp][SELECTED_TIME]);
    }

    return stockData;
}

function getApiEndpoint(symbol) {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=${API_KEY}`;
}
