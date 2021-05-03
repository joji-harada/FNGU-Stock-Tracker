import React, { useState, useEffect } from 'react';
import fetchStockData from './fetchStockData';
import Plot from 'react-plotly.js';

const Chart = ({ symbol }) => {
    const [stockData, setStockData] = useState({});

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
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                ]}
                layout = {{width: 1000, height: 400, title: `${symbol}`}}
            />
        </div>
    );
};

export default Chart;