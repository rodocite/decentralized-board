import { Scaffold } from './contracts/Scaffold.sol'
import IPFS from 'ipfs'

class Index extends React.Component {
  state = {
    ipfsReady: false
  }

  componentDidMount() {
    const ipfs = new IPFS()

    ipfs.once('ready', () => {
      this.setState({ ipfsReady: true })
    })
  }

  render() {
    console.log(`IPFS node ready: ${this.state.ipfsReady}`)

    return (
      <div>Hello</div>
    )
  }
}

export default Index