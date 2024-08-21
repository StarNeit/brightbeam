const convertSheetToObjects = (data) => {
  return data.reduce((acc, item) => {
    acc[item['Street Name']] = parsePrice(item['Price']);
    return acc;
  }, {});
}

const parsePrice = (price) => {
  return parseInt(price.replace(/\x80/g, '').replace(/[,]/g, ''));
}

const extractStreetName = (obj)=> {
  const values = [];

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      const subValues = extractStreetName(obj[key]);
      values.push(...subValues);
    } else {
      values.push(key);
    }
  }

  return values;
}

const parseNumberToCurrency = (value) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR'
  })
}

module.exports = {
  convertSheetToObjects,
  parsePrice,
  extractStreetName,
  parseNumberToCurrency
}
