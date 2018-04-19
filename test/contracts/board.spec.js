const Web3 = require('web3')
const decode = require('abi-decoder')
const compiledContracts = require('../../contracts/contracts.json')
const deployedAddresses = require('../../contracts/addresses.json')
const _ = require('lodash')

describe('Board :: Contracts', () => {
  let Board

  beforeAll(async () => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    accounts = await web3.eth.getAccounts()
    Board = new web3.eth.Contract(compiledContracts.Board.abi, deployedAddresses.Board)
  })

  describe('Board.setAddress', () => {
    it('should set the ipfs address', async () => {
      const hash = '0x88afe29d4e57373e6ba24bb8bb93d680d57f2be7faebec05fda56584edd4934c'
      const setValue = await Board.methods.setAddress(hash).send({
        from: accounts[1],
        value: 1,
        gas: 2000000
      })

      expect(setValue).toBeTruthy()
    })
  })

  describe('Board.getAddresses', () => {
    it('should return tuples of addresses and values', async () => {
      const hash = '0x88afe29d4e57373e6ba24bb8bb93d680d57f2be7faebec05fda56584edd4934c'
      const expected = {"0": ["0x88afe29d4e57373e6ba24bb8bb93d680d57f2be7faebec05fda56584edd4934c"], "1": ["1"]}

      const getValue = await Board.methods.getAddresses().call()

      expect(getValue).toEqual(expected)
    })
  })
})