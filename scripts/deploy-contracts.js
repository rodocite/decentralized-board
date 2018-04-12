const args = require('yargs').argv
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const Web3 = require('web3')

/**
 * Get CLI args
 * @const
 */
const { config, rpc } = args

/**
 * Import config options
 * @const opts
 */
const opts = require(path.resolve(config))

/**
 * Import contract interfaces
 * @type {Object}
 */
const compiledContracts = require(path.resolve(opts.contractsPath))

/**
 * Resolve deployed contract addresses filepath
 * @type {String}
 */
const deployedAddressesPath = path.resolve(opts.addressesPath)

/**
 * Initialise Web3 with an RPC endpoint (http://localhost:8545)
 * @type {Web3}
 */
const web3 = new Web3(new Web3.providers.HttpProvider(opts.rpc[rpc]))
/**
 * Deploy the Scaffold contracts!
 */
const deployContracts = (async () => {
  try {
    // get web3 accounts
    const accounts = await web3.eth.getAccounts()

    // set contract deployment address to primary account
    opts.fromAccount = accounts[0]

    // get Scaffold, ScaffoldBank and ScaffoldStorage contract interfaces
    const scaffoldInterface = compiledContracts.Scaffold

    // create Todo contract instance
    const scaffoldContract = new web3.eth
      .Contract(scaffoldInterface.abi, { data: scaffoldInterface.bytecode })

    const scaffold = await scaffoldContract
      .deploy()
      .send({ from: opts.fromAccount, gasLimit: opts.gasLimit })

    const scaffoldAddress = scaffold.options.address

    // ensure deployed contract addresses file exists before reading it
    const deployedAddressesExists = await fs.pathExists(deployedAddressesPath)

    // create empty JSON file if deployed contract addresses file does not exist
    if (!deployedAddressesExists)
      await fs.outputJson(deployedAddressesPath, {}, { spaces: 2 })

    // read existing deployed contract addresses
    const deployedAddresses = await fs.readJson(deployedAddressesPath)

    // write deployed contract address to disk
    await fs.writeJson(
      deployedAddressesPath,
      Object.assign({}, deployedAddresses, {
        Scaffold: scaffoldAddress
      }),
      { spaces: 2 }
    )

    // construct Scaffold module export
    const scaffoldContractExport = `
      const abi = ${JSON.stringify(scaffoldInterface.abi)}
      export const Scaffold = new web3.eth.Contract(abi, '${scaffoldAddress}')
    `

    // write Scaffold contract export file
    await fs.writeFileSync(
      `${opts.outputPath}/${opts.contracts.Scaffold.filename}.js`,
      opts.outputString.concat(scaffoldContractExport)
    )

    // happy days!
    return console.log(chalk.green.bold(`🎉  Scaffold contracts deployed!`))
  } catch (e) {
    console.error(e)
  }
})()