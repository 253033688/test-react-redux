import React from 'react';
import PropTypes from 'prop-types'
import Testlist from './TestList'
import { connect } from '../m-react-redux'

class App extends React.Component {
  static propTypes = {
    themeColor: PropTypes.string,
    onChangeColor: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 3]
    }
  }

  handleChnageList () {
    const len = parseInt(Math.random(0, 1) * 10)
    const list = new Array(len).fill(0).map(item => parseInt(Math.random(0, 1) * 10))
    this.setState({
      list
    })
  }

  handleChangeColor(){
    const index = parseInt(Math.random(0, 1) / 3 * 10)
    const color = ['red', 'green', 'blue'][index]

    if(this.props.onChangeColor){
      this.props.onChangeColor(color)
    }
  }

  render () {
    return (
      <ul>
        <button onClick={this.handleChnageList.bind(this)}>change list</button>
        <button onClick={this.handleChangeColor.bind(this)}>change themeColor</button>
        {this.state.list.map((item, index) => <Testlist key={index} num={item} themeColor={this.props.themeColor}></Testlist>)}
      </ul >
    )
  }
}

const mapStateToProps = state => {
  return {
      themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeColor: color => {
      dispatch({type: 'CHANGE_COLOR', themeColor: color})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)