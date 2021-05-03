import React, { useState, useEffect } from 'react';
import fetchStockData from './fetchStockData';
import Plot from 'react-plotly.js';

const Chart = ({ symbol }) => {
    const [stockData, setStockData] = useState({});

    //logic to dictate green or red
    //using data.changeOverTime
    

    useEffect(async () => {
        setStockData(await fetchStockData(symbol));
    }, []);

    return(
        <div>
            <Plot 
                data = {[
                    {
                        x: stockData.xVals,
                        y: stockData.yVals,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: `${stockData.color}`},
                        connectgaps: true,
                        xaxis: { title: 'Time' },
                        yaxis: { title: 'Price' },
                    },
                ]}
                layout = {{width: 700, height: 400, title: `${symbol}`}}
            />
        </div>
    );
};

export default Chart;