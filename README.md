![screenshot of app](https://github.com/joji-harada/FNGU-Stock-Tracker/blob/master/FNGU-Tracker.png)
# FNGU Tracker

This project aims to solve a common problem for investors with stake in an Exchange Trade Fund (ETF).

## The Problem

An ETF is is a type of security that tracks an index, sector, commodity, or other asset and they are influenced by the performance of the basket of securities it tracks.
Investors of an ETF typically like to see the performance of the individual securities that are influencing their ETF investments and depending on the ETF, usually the only option available is opening additional tabs to display each individual chart.

## The Solution

This app compiles current daily data from the basket of securities of a given ETF (currently working solely for FNGU) and displays the charts on a single page. It also renders the "top mover" to the top of the page.

## Technical Features

Utilizes IEX Cloud API to fetch pertinent stock data. Each stock ticker populates the data of a Chart component through a dynamic endpoint data fetching algorithm. All of these endpoints are then batched in a single Promise object and returns the data as one large JavaScript object that is stored in the React state object. This object is then parsed and passed down to the Chart components through the props 'parent-child' uni-directional flow.

This application also features custom written code that filters and sorts the data being fetched in order to implement some useful UX features. The main feature is called the "Top Mover" feature. As seen in the stockUtils.js file, calculations are made to the stock data in real time to conclude which stock ticker has performed with the highest magnitude. The stock ticker with such a quality is assigned a 'true' value to the 'isTopMover' boolean key-value pair and then is sorted to the top of stock list. When the component renders on the screen, the top mover is displayed widely at the top of application for users to see first and foremost.

# Setup

### `Install dependencies`
```bash
npm i
```

### `Environment Variable`

Create .env file at project root. Name the variable REACT_APP_STOCK_KEY and assign it your IEX Cloud API key. Free key available at https://iexcloud.io/

### `Run application`
with npm
```bash
npm start
```
or with yarn
```bash
yarn start
```
Command will open [http://localhost:3000](http://localhost:3000) in the browser.