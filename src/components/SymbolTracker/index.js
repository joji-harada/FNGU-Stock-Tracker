import React, { useState, useEffect } from 'react';
import getStockData from './getStockData';
import Plot from 'react-plotly.js';

const Chart = ({ symbol }) => {
    const [stockData, setStockData] = useState({});

    useEffect(async () => {
        setStockData(await getStockData(symbol));
    }, []);

    return(
        <div>
            <Plot 
                data = {[
                    {
                        x: stockData.xVals,
                        y: stockData.yVals,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                ]}
                layout = {{width: 720, height: 440, title: `${symbol}`}}
            />
        </div>
    );
};

export default Chart;