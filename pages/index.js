import { Board } from './contracts/Board.sol'
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
        this.setState({ ipfsPath: res[0].path }, () => {
          this.getFromIPFS()
        })
      })
    }
  }

  getFromIPFS = () => {
    if (this.state.ipfsPath)
    this.ipfs.files.get(this.state.ipfsPath, (err, data) => {
      const { content, path } = data[0]
      const hex = "0x" + bs58.decode(path).slice(2).toString('hex')
      this.setState({ ipfsData: content.toString() })
      Board.methods.setAddress(hex).send({ from: this.state.publicAddress, value: 1 })
      Board.methods.getOwner().call({ from: this.state.publicAddress }).then(console.log)
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