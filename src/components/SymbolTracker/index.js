import React from 'react';
import Plot from 'react-plotly.js';

const Chart = ({ symbol, className, data, topMoverText }) => {
    return(
        <div className={className}>
            <Plot 
                data = {[
                    {
                        x: data.xVals,
                        y: data.yVals,
                        type: 'scatter',
                        mode: 'lines',
                        marker: { color: `${data.color}` },
                        connectgaps: true,
                    },
                ]}
                layout = {
                    {
                        autosize: true,
                        title: `${topMoverText}${symbol}`,
                        xaxis: { 
                            gridcolor: '2b2b2b',
                            title: 'EST'
                        },
                        yaxis: {
                            gridcolor: '2b2b2b',
                        },
                        margin: {
                            l: 40,
                            r: 40,
                            b: 100,
                            t: 100,
                            pad: 4
                        },
                        font: {color: 'green'},
                        paper_bgcolor: '#1c1c1c',
                        plot_bgcolor: '#1c1c1c',
                    }
                }
                useResizeHandler = {true}
                style={
                    {
                        width: '100%',
                        height: '100%'
                    }
                }
            />
        </div>
    );
};

export default Chart;