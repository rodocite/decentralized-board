# DAPP APP
A dapp app using NextJS and Ethereum. I'm not sure what kind of app it will be yet. Still scaffolding.

## Flow
An IPFS address hash is created when storing a message. The Board Smart Contract can set/get the IPFS address hash into Ethereum. Storing the address requires a transaction.

## An example of IPFS storage
This project is a bit of a contrived example of using IPFS with Ethereum since you can actually store text in a Smart Contract state variable. However, storing the messages on IPFS does removes load from the blockchain and would theoretically reduce gas price per transaction.

## Unpinning Data
Currently, it doesn't seem possible to unpin data using the IPFSJS library that this project is using.

## Starting the Project
```
npm install
npm run blockchain
npm run compile
npm run deploy
npm run dev
```