import { Board } from './contracts/Board.sol'
import { encodeIPFSHash, decodeIPFSHash } from './utilities'
import Blocks from './components/blocks'
import Hamburger from './components/hamburger'
import web3 from 'web3'
import bs58 from 'bs58'
import IPFS from 'ipfs'
import styled from 'styled-components'
import _ from 'lodash'

const InputContainer = styled.div`
  position: fixed;
  font-family: Open Sans;
  display: flex;
  padding: 20px;
  justify-content: center;
  left: 50%;
  background: white;
  animation-duration: 0.3s;
  animation-name: scaleIn;
  transform: translateX(-50%);
  flex-direction: column;
  bottom: 100px;
  width: 400px;
  z-index: 2;

  p {
    margin: 0;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    color: #666;
  }

  input {
    font-size: 28px;
    margin-bottom: 20px;
    max-width: 600px;
    background: lightslategray;
    border: none;
    color: white;
    padding: 5px;

    :focus {
      outline: none;
    }
  }

  button {
    max-width: 150px;
    height: 50px;
    background: lightsalmon;
    font-size: 12px;
    color: white;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    letter-spacing: 2px;
  }

  @media(max-width: 425px) {
    width: 90%;
  }

  @keyframes scaleIn {
    0% {
      opacity: 0;
      bottom: 0;
    }

    100% {
      opacity: 1;
      bottom: 100px;
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
        <p>Your Message</p>
        <input onChange={(e) => this.setState({ message: e.target.value })} value={ this.state.message } />
        <p>Amount of Ethereum</p>
        <input onChange={(e) => this.setState({ value: e.target.value })} value={ this.state.value } />
        <p>Your Wallet Address</p>
        <input onChange={(e) => this.setState({ publicAddress: e.target.value })} value={ this.state.publicAddress } />
        <button onClick={this.addToIPFS}>Post Your Message</button>
      </InputContainer>
    )
  }

  render() {
    return (
      <div>
        <Blocks data={ this.state.content } />
        { this.renderInput() }
        <Hamburger onClick={() => this.setState({ showInput: !this.state.showInput })} />
      </div>
    )
  }
}

export default Index