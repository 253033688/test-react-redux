import React from 'react';
import PropTypes from 'prop-types'

export default class Testlist extends React.Component {
    static propsTypes = {
        num: PropTypes.string || PropTypes.number,
        themeColor: PropTypes.string
    }

    static defaultProps = {
        num: '',
        themeColor: 'green'
    }

    constructor (props) {
        super(props)
        this.state = {
            val: 'props'
        }
    }

    render () {
        return (
            <li style={{ color: this.props.themeColor }}> {this.state.val}: {this.props.num}</ li>
        )
    }
}
