const API_KEY = process.env.REACT_APP_STOCK_KEY;

export default async function fetchStockData(symbol) {
    const stockData = {
        xVals: [],
        yVals: [],
        color: '',
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
    console.log('symbol: ', symbol, 'change over time: ',changeOverTime);
    if(changeOverTime >= 0){
        stockData.color = 'green';
    } else {
        stockData.color = 'red';
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