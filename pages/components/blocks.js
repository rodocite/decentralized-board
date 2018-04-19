import web3 from 'web3'
import styled from 'styled-components'
import _ from 'lodash'

const Block = styled.div`
  font-family: Open Sans;
  box-sizing: border-box;
  background: steelblue;
  color: white;
  font-size: ${ ({size}) => size }px;
  display: inline-block;
  transform: translateZ(0);
  margin: 10px;
  transition: all 0.3s;
  animation-duration: 0.3s;
  animation-name: scaleIn;
  padding: ${ ({size}) => size / 3 }px;
  border-radius: 5px;
  word-wrap: break-word;
  flex: 0;

  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }
`

const Container = styled.div`
  background: lightskyblue;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transform: translateZ(0);
`

class Message extends React.Component {
  state = {
    message: ''
  }

  componentDidMount() {
    this.props.text.then((message) => {
      console.log(message)
      this.setState({ message })
    })
  }

  render() {
    return this.state.message
  }
}

class BlockContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.length !== this.props.data.length) {
      return true
    }

    return false
  }

  renderBlocks() {
    return _.map(this.props.data, (block, index) => {
      const size = web3.utils.fromWei(block.value, 'ether') * 15

      return (
        <Block size={ size } key={ index }>
          <Message text={ block.content } />
        </Block>
      )
    })
  }

  render() {
    return (
      <Container>
        { this.renderBlocks() }
      </Container>
    )
  }
}

export default BlockContainer;