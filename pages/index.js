import { Board } from './contracts/Board.sol'
import { encodeIPFSHash, decodeIPFSHash } from './utilities'
import web3 from 'web3'
import bs58 from 'bs58'
import IPFS from 'ipfs'
import styled from 'styled-components'
import _ from 'lodash'

const Block = styled.div`
  background: rgb(235, 237, 240);
  width: 10px;
  height: 10px;
`

// do this for now to show content
class Content extends React.Component {
  state = {
    content: ''
  }

  componentDidMount() {
    this.props.content.then((content) => {
      this.setState({ content })
    })
  }

  render() {
    return (
      <div>{ this.state.content }</div>
    )
  }
}

class Index extends React.Component {
  state = {
    ipfsReady: false,
    content: [],
    message: '',
    publicAddress: ''
  }

  componentDidMount() {
    this.ipfs = new IPFS({ repo: '../repo', init: false })

    this.ipfs.once('ready', () => {
      this.setState({ ipfsReady: true }, () => {
        console.log(`IPFS node ready: ${this.state.ipfsReady}`)
      })
      this.getFromContract()
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
        Board.methods.set(decodedHash).send({
          from: this.state.publicAddress,
          value: web3.utils.toWei('1', 'ether'),
          gas: 2000000
        })
        .then(() => {
          this.getFromContract()
        })
      })
    }
  }

  getFromContract = () => {
    Board.methods.getAddresses().call().then((tuples) => {
      if (!tuples[0].length) return

      const addresses = tuples[0]
      const values = tuples[1]
      const content =  _.map(addresses, (address, index) => {
        const ipfsPath = encodeIPFSHash(address)

        return {
          value: values[index],
          address: ipfsPath,
          content: this.getFromIPFS(ipfsPath)
        }
      })

      this.setState({ content })
    })
  }

  getFromIPFS = async (ipfsHash) => {
    const content = await this.ipfs.files.get(ipfsHash)
    return content[0].content.toString()
  }

  renderContent() {
    return _.map(this.state.content, ({ address, value, content }, index) => {
      return (
        <div key={ index }>
          <div>{ address }</div>
          <div>{ value }</div>
          <Content content={ content } />
          <Block />
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        { this.renderContent() }
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