const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../matches.json');

function readData() {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
  return JSON.parse(data);
}

function writeData(matches) {
  fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
}

module.exports = { readData, writeData };
