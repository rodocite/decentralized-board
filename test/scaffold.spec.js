const Web3 = require('web3')
const decode = require('abi-decoder')
const compiledContracts = require('../contracts/contracts.json')
const deployedAddresses = require('../contracts/addresses.json')

describe('Scaffold :: Contracts', () => {
  let Scaffold

  beforeAll(async () => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    accounts = await web3.eth.getAccounts()
    Scaffold = new web3.eth.Contract(compiledContracts.Scaffold.abi, deployedAddresses.Scaffold)
  })

  describe('', () => {
    it('', async () => {

    })
  })
})