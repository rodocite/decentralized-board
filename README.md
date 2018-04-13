# DAPP APP
A dapp app using NextJS and Ethereum. I'm not sure what kind of app it will be yet. Still scaffolding.

## Flow
An IPFS address hash is created when storing a message. The Board Smart Contract can set/get the IPFS address hash into Ethereum. Storing the address requires a transaction.

## A Contrived Example
This project is a contrived example of using IPFS with Ethereum since you can actually store text in your state store in your Smart Contracts.

## Unpinning Data
Currently, it doesn't seem possible to unpin data using the IPFSJS library that this project is using.

```
npm install
npm run blockchain
npm run compile
npm run deploy
npm run dev
```