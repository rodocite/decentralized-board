import { Scaffold } from './contracts/Scaffold.sol'
import IPFS from 'ipfs'

const Index = (props) => {
  const { _address } = Scaffold

  return (
    <div>
      <p>Contract Address</p>
      { _address }
    </div>
  )
}

Index.getInitialProps = async (context) => {
  const node = new IPFS()

  return {
    ipfs
  }
}

export default Index