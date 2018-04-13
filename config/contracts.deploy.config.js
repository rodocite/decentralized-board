const path = require('path')

module.exports = {
  addressesPath: path.join(__dirname, '../contracts/addresses.json'),
  contractsPath: path.join(__dirname, '../contracts/contracts.json'),

  contracts: {
    Board: {
      filename: 'Board.sol',
    },
  },

  gasLimit: 4700000,
  inputPath: path.join(__dirname, '../contracts'),
  outputPath: path.join(__dirname, '../pages/contracts'),
  outputString: "import web3 from '../web3'\n\n",

  rpc: {
    development: 'http://localhost:8545',
    production: 'http://localhost:8545',
  },
}