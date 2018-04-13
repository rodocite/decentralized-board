const path = require('path')

module.exports = {
  contractFileExtension: 'sol',

  contracts: [
    'Board',
    'Bank',
    'Storage'
  ],

  inputPath: path.join(__dirname, '../contracts'),
  outputFilename: 'contracts',
  outputPath: path.join(__dirname, '../contracts'),
}