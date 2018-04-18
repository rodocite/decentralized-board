import styled from 'styled-components'
import _ from 'lodash'

const Block = styled.div`
  box-sizing: border-box;
  background: rgb(235, 237, 240);
  width: ${ ({size}) => size }px;
  height: ${ ({size}) => size }px;
  display: inline-block;
  transform: translateZ(0);
  margin: ${ ({size}) => Math.floor(size / 10) }px;

  :before {
    content: '';
  }

  :hover {
    background: red;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
  transform: translateZ(0);
`

class BlockContainer extends React.Component {
  renderBlocks() {
    return _.map(Array(1000), (_, index) => {
      const size = Math.floor(Math.random() * (200 - 10 + 1) + 10);
      return (
        <Block size={ size } />
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