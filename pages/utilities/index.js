import web3 from 'web3'
import bs58 from 'bs58'

export const encodeIPFSHash = (hash) => {
  const hashHex = '1220' + hash.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex')
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

export const decodeIPFSHash = (hash) => web3.utils.bytesToHex(bs58.decode(hash).slice(2))

