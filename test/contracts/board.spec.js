const Web3 = require('web3')
const decode = require('abi-decoder')
const compiledContracts = require('../../contracts/contracts.json')
const deployedAddresses = require('../../contracts/addresses.json')

describe('Board :: Contracts', () => {
  let Board

  beforeAll(async () => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    accounts = await web3.eth.getAccounts()
    Board = new web3.eth.Contract(compiledContracts.Board.abi, deployedAddresses.Board)
  })

  describe('Board.setAddress, Board.getAddress', () => {
    it('should set the ipfs address', async () => {
      const hash = '0x88afe29d4e57373e6ba24bb8bb93d680d57f2be7faebec05fda56584edd4934c'
      Board.methods.setAddress(hash).send({ from: accounts[0] })
      const getValue = await Board.methods.getAddress().call({ from: accounts[0] })

      expect(getValue).toEqual(hash)
    })
  })
})