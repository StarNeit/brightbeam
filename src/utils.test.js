const { convertSheetToObjects, parsePrice, extractStreetName, parseNumberToCurrency } = require('./utils.js');

const mockSheetOutput = [
  {
    'Street Name': 'street A',
    'Price': '\x8050,000.00'
  },
  {
    'Street Name': 'street B',
    'Price': '\x8060,000.00'
  }
];

const mockStreetJson = {
  "short": {
    "drive": {
      "abbey": {
        "abbey drive": 0
      },
      "coolrua": {
        "coolrua drive": 10
      },
      "coultry": {
        "coultry drive": 5
      },
      "drumcliffe": {
        "drumcliffe drive": 0
      },
      "park": {
        "grove": {
          "grove park drive": 10
        }
      },
    }
  }
}

describe('Test util functions', () => {
  test('Parse price string to readable value', () => {
    expect(parsePrice('\x8060,000.00')).toBe(60000);
  });

  test('Convert sheet output to objects', () => {
    expect(convertSheetToObjects(mockSheetOutput)).toEqual({
      'street A': 50000,
      'street B': 60000
    });
  });

  test('Extract street name from json', () => {
    expect(extractStreetName(mockStreetJson)).toEqual(['abbey drive', 'coolrua drive', 'coultry drive', 'drumcliffe drive', 'grove park drive']);
  });

  test('Parse number to currency type', () => {
    expect(parseNumberToCurrency(54000.2345234)).toBe('€54,000.23');
  });
});
