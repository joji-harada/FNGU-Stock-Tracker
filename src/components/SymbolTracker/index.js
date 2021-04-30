import React, { useState, useEffect } from 'react';
import getStockData from './getStockData'

const Chart = ({ symbol }) => {
    const [stockData, setStockData] = useState({});

    useEffect(async () => {
        setStockData(await getStockData(symbol));
    }, []);

    return(
        <div>
            <h1>FNGU Tracker</h1>
            <h2>X Values:</h2>
            <p>{ stockData.xVals }</p>
            <h2>Y Values:</h2>
            <p>{ stockData.yVals }</p>
        </div>
    );
};

export default Chart;