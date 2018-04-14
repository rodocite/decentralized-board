import { Board } from './contracts/Board.sol'
import { encodeIPFSHash, decodeIPFSHash } from './utilities'
import web3 from 'web3'
import bs58 from 'bs58'
import IPFS from 'ipfs'

class Index extends React.Component {
  state = {
    ipfsReady: false,
    ipfsPath: '',
    ipfsData: '',
    message: '',
    publicAddress: ''
  }

  componentDidMount() {
    this.ipfs = new IPFS({ repo: '../repo', init: false })

    this.ipfs.once('ready', () => {
      this.setState({ ipfsReady: true }, () => {
        console.log(`IPFS node ready: ${this.state.ipfsReady}`)
      })
      this.getFromIPFS()
    })
  }

  componentWillUnmount() {
    this.ipfs.stop()
  }

  addToIPFS = () => {
    const { ipfsReady, message } = this.state
    const message_ = new Buffer(message)

    if (message && ipfsReady) {
      this.ipfs.files.add(message_, (err, res) => {
        const { hash } = res[0]
        const decodedHash = decodeIPFSHash(hash)

        Board.methods.setAddress(decodedHash).send({ from: this.state.publicAddress })
          .then(() => {
            this.setState({ ipfsData: message })
          })
      })
    }
  }

  getFromIPFS = () => {
    Board.methods.getAddress().call().then((ipfsAddress) => {
      if (!ipfsAddress) return
      const ipfsHash = encodeIPFSHash(ipfsAddress)

      this.ipfs.files.get(ipfsHash, (err, data) => {
        const { content, path } = data[0]
        this.setState({ ipfsData: content.toString() })
      })
    })
  }

  render() {
    return (
      <div>
        <p>{ this.state.ipfsData }</p>
        <p>Message</p>
        <input onChange={(e) => this.setState({ message: e.target.value })} />
        <br />
        <p>Address</p>
        <input onChange={(e) => this.setState({ publicAddress: e.target.value })} />
        <br />
        <button onClick={this.addToIPFS}>Submit</button>
      </div>
    )
  }
}

export default Index