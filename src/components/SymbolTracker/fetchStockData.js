const API_KEY = 'pk_818e7ea55467412686835fad70b8f692';
const TIME_POINT = {
    OPEN: 'open',
    HIGH: 'high',
    LOW: 'low',
    CLOSE: 'close',
    VOLUME: 'volume',
};

const SELECTED_TIME = TIME_POINT.OPEN;

export default async function fetchStockData(symbol) {
    const stockData = {
        xVals: [],
        yVals: [],
    };
    const endpoint = getApiEndpoint(symbol);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    data.forEach((entry) => {
        stockData.xVals.push(entry.minute);
        stockData.yVals.push(entry.marketAverage);
        
    })
    
    return stockData;
}

function getApiEndpoint(symbol) {
    return `https://cloud.iexapis.com/stable/stock/${symbol}/chart/date/20200415?token=${API_KEY}`;
}
