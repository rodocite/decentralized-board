const args = require('yargs').argv
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const Web3 = require('web3')

const { config, rpc } = args
const opts = require(path.resolve(config))

const compiledContracts = require(path.resolve(opts.contractsPath))
const deployedAddressesPath = path.resolve(opts.addressesPath)
const web3 = new Web3(new Web3.providers.HttpProvider(opts.rpc[rpc]))

const deployContracts = (async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    opts.fromAccount = accounts[0]

    const boardInterface = compiledContracts.Board
    const storageInterface = compiledContracts.Storage

    // Storage
    const storageContract = new web3.eth
      .Contract(storageInterface.abi, { data: storageInterface.bytecode })

    const storage = await storageContract
      .deploy()
      .send({ from: opts.fromAccount, gasLimit: opts.gasLimit })

    const storageAddress = storage.options.address

    // Board
    const boardContract = new web3.eth
      .Contract(boardInterface.abi, { data: boardInterface.bytecode })

    const board = await boardContract
      .deploy()
      .send({ from: opts.fromAccount, gasLimit: opts.gasLimit })

    const boardAddress = board.options.address

    const deployedAddressesExists = await fs.pathExists(deployedAddressesPath)

    if (!deployedAddressesExists)
      await fs.outputJson(deployedAddressesPath, {}, { spaces: 2 })

    const deployedAddresses = await fs.readJson(deployedAddressesPath)

    await fs.writeJson(
      deployedAddressesPath,
      Object.assign({}, deployedAddresses, {
        Board: boardAddress
      }),
      { spaces: 2 }
    )

    const boardContractExport = `
      const abi = ${JSON.stringify(boardInterface.abi)}
      export const Board = new web3.eth.Contract(abi, '${boardAddress}')
    `

    await fs.writeFileSync(
      `${opts.outputPath}/${opts.contracts.Board.filename}.js`,
      opts.outputString.concat(boardContractExport)
    )

    return console.log(chalk.green.bold(`🎉  Board contracts deployed!`))
  } catch (e) {
    console.error(e)
  }
})()