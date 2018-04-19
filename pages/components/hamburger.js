import styled from 'styled-components'

const Position = styled.div`
  display: inline-block;
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
`

const Button = styled.div`
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  cursor: pointer;
  height: 40px;
  justify-content: space-between;
  position: relative;
  position: relative;
  width: 50px;
`

const lineBase = styled.div`
  position: absolute;
  background: white;
  height: 5px;
  transition: all 200ms ease-in-out;
  width: 100%;
`

const Line1 = lineBase.extend`
  top: ${ props => !props.closed ? '0%' : '50%' };
  transform: rotate(${ props => !props.closed ? '0deg' : '225deg'});
`

const Line2 = lineBase.extend`
  top: 50%;
  opacity: ${ props => !props.closed ? 1 : 0 };
`

const Line3 = lineBase.extend`
  top: ${ props => !props.closed ? '100%' : '50%' };
  transform: rotate(${ props => !props.closed ? '0deg' : '-225deg'});
`

export default class Hamburger extends React.Component {
  state = {
    closed: false
  }

  handleOnClick = () => {
    this.setState({ closed: !this.state.closed })
    this.props.onClick()
  }

  render() {
    const { closed } = this.state

    return (
      <Position>
        <Button onClick={ this.handleOnClick }>
          <Line1 closed={ closed } />
          <Line2 closed={ closed } />
          <Line3 closed={ closed } />
        </Button>
      </Position>
    )
  }
}