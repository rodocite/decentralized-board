import { Board } from './contracts/Board.sol'
import { encodeIPFSHash, decodeIPFSHash } from './utilities'
import Blocks from './components/blocks'
import web3 from 'web3'
import bs58 from 'bs58'
import IPFS from 'ipfs'
import styled from 'styled-components'
import _ from 'lodash'

const InputContainer = styled.div`
  position: fixed;
  font-family: Open Sans;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  background: white;
  animation-duration: 0.3s;
  border: 1px solid #999999;
  animation-name: scaleIn;
  transform: translateX(-50%);
  z-index: 2;

  @keyframes scaleIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

class Index extends React.Component {
  state = {
    ipfsReady: false,
    content: [],
    message: '',
    publicAddress: '',
    showInput: false,
    value: ''
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
    const { ipfsReady, message, value } = this.state
    const message_ = new Buffer(message)

    if (message && ipfsReady) {
      this.ipfs.files.add(message_, (err, res) => {
        const { hash } = res[0]
        const decodedHash = decodeIPFSHash(hash)
        Board.methods.set(decodedHash).send({
          from: this.state.publicAddress,
          value: web3.utils.toWei(value, 'ether'),
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

      this.setState({
        content,
        message: '',
        publicAddress: '',
        value: ''
      })
    })
  }

  getFromIPFS = async (ipfsHash) => {
    const content = await this.ipfs.files.get(ipfsHash)
    return content[0].content.toString()
  }

  renderInput() {
    return this.state.showInput && (
      <InputContainer>
        <p>Message</p>
        <input onChange={(e) => this.setState({ message: e.target.value })} value={ this.state.message } />
        <p>Value</p>
        <input onChange={(e) => this.setState({ value: e.target.value })} value={ this.state.value } />
        <p>Address</p>
        <input onChange={(e) => this.setState({ publicAddress: e.target.value })} value={ this.state.publicAddress } />
        <button onClick={this.addToIPFS}>Submit</button>
      </InputContainer>
    )
  }

  render() {
    return (
      <div>
        <Blocks data={ this.state.content } />
        { this.renderInput() }
      </div>
    )
  }
}

export default Index