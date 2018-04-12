import { Scaffold } from './contracts/Scaffold.sol'

export default () => {
  const { _address } = Scaffold
  return (
    <div>
      <p>Contract Address</p>
      { _address }
    </div>
  )
}