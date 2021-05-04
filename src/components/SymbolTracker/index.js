import React, { useState, useEffect } from 'react';
import fetchStockData from './fetchStockData';
import Plot from 'react-plotly.js';

const Chart = ({ symbol }) => {
    const [stockData, setStockData] = useState({});
    const size = (symbol) => {
        if(symbol === 'FNGU'){
            return 1000;
        } else {
            return 325;
        }
    }

    useEffect(() => {
        let fetchData = async () => {
            setStockData(await fetchStockData(symbol));
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        
                    },
                ]}
                layout = {
                    {
                        width: `${size(symbol)}`,
                        height: 400,
                        title: `${symbol}`,
                        xaxis: { title: 'Time' },
                        yaxis: { title: 'Price' },
                    }
                }
            />
        </div>
    );
};

export default Chart;