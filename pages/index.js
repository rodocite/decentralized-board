import { Scaffold } from './contracts/Scaffold.sol'
import bs58 from 'bs58'
import IPFS from 'ipfs'

class Index extends React.Component {
  state = {
    ipfsReady: false,
    ipfsPath: null,
    ipfsData: '',
    message: ''
  }

  componentDidMount() {
    this.ipfs = new IPFS({ repo: '../repo' })

    this.ipfs.once('ready', () => {
      console.log(`IPFS node ready: ${this.state.ipfsReady}`)
      this.setState({ ipfsReady: true })
      this.getFromIPFS()
    })
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
      const { content } = data[0]
      this.setState({ ipfsData: content.toString() })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <p>{ this.state.ipfsData }</p>
        <input onChange={(e) => this.setState({ message: e.target.value })} />
        <button onClick={this.addToIPFS}>Submit</button>
      </div>
    )
  }
}

export default Index