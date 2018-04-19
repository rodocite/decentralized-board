# Tweet Board
A "tweet" board dapp using NextJS, Ethereum, and IPFS. Users can freely post messages. Emphasis (only font size at the moment) of the message is determined by value of ETH sent in. Messages are stored in IPFS and an IPFS hash/path is recorded in the transaction that is used to retrieve the message.

## An example of IPFS storage
This project is a bit of a contrived example of using IPFS with Ethereum since you can actually store text in a Smart Contract state variable. However, storing the messages on IPFS does removes load from the blockchain and would theoretically reduce gas price per transaction.

## Unpinning Data
Currently, it doesn't seem possible to unpin data using the IPFS.js library that this project is using.

## Starting the Project
```
npm install
npm run blockchain
npm run compile
npm run deploy
npm run dev
```