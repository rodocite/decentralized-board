![](https://github.com/rodocite/smart-contracts-project/blob/master/screenshot.png)

# Message Board
A "message" board dapp using NextJS, Ethereum, and IPFS. Users can freely post messages. Emphasis (only font size at the moment) of the message is determined by value of ETH sent in. Messages are stored in IPFS and an IPFS hash/path is recorded in the transaction that is used to retrieve the message.

## An example of IPFS storage
This project is a bit of a contrived example of using IPFS with Ethereum since you can actually store text in a Smart Contract state variable. However, storing the messages on IPFS does removes load from the blockchain and would theoretically reduce gas price per transaction.

## Hashing
When storing the IPFS hash/path into the contracts, you need to re-hash it into a 32-byte hex. Check out this SO: https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes

```js
export const encodeIPFSHash = (hash) => {
  const hashHex = '1220' + hash.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex')
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

export const decodeIPFSHash = (hash) => web3.utils.bytesToHex(bs58.decode(hash).slice(2))
```

## Unpinning Data
Currently, it doesn't seem possible to unpin data using the IPFS.js library that this project is using.

## Starting the Project
Start the blockchain server first. Then compile & deploy the smart contracts. If there are any changes on the smart contracts, they need to be re-compiled and re-deployed. Restart the blockchain server if you want a fresh blockchain with no stored messages.

```
npm install
npm run blockchain
npm run compile
npm run deploy
npm run dev
```

## Posting a Message
You need a wallet address. Copy a `public key` from the 10 ganache-cli will provide you after you `npm run blockchain`. The amount of ETH specified will affect how big the message is. When someone posts, the ETH sent in will be transferred to the owner (wallet address) of the Smart Contract.

![](https://github.com/rodocite/smart-contracts-project/blob/master/ganache-accounts.png)
