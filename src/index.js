const path = require ('path');
const XLSX = require('xlsx');

const { extractStreetName, parseNumberToCurrency, convertSheetToObjects } = require('./utils.js');
const { short, tall } = require('./data/dublin-trees.json');

const workbook = XLSX.readFile(path.join(__dirname, 'data', 'dublin-property.csv'));
const sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


const priceData = convertSheetToObjects(data);

const shortStreets = extractStreetName(short);
const tallStreets = extractStreetName(tall);

const shortStreetPriceSum = shortStreets.reduce((acc, name) => acc + (priceData[name] ?? 0), 0);
const tallStreetPriceSum = tallStreets.reduce((acc, name) => acc + (priceData[name] ?? 0), 0);

console.log('Short street average price:',  parseNumberToCurrency(shortStreetPriceSum / shortStreets.length));
console.log('Tall street average price:', parseNumberToCurrency(tallStreetPriceSum / tallStreets.length));


