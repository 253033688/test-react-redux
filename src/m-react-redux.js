import React from 'react'
import PropTypes from 'prop-types'

export const createStore = reducer => {
    let state = null
    const listeners = []
    const subscribe = listener => listeners.push(listener)
    const getState = () => state
    const dispatch = action => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    dispatch({}) // 初始化state

    return { getState, dispatch, subscribe }
}

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor (props) {
            super(props)
            this.state = {
                allProps: {}
            }
        }

        componentWillMount () {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }

        _updateProps () {
            const { store } = this.context
            const stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
            const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {}

            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render () {
            return (
                <WrappedComponent {...this.state.allProps} />
            )
        }
    }

    return Connect
}

export class Provider extends React.Component {
    static propTypes = {
      store: PropTypes.object,
      children: PropTypes.any
    }
  
    static childContextTypes = {
      store: PropTypes.object
    }
  
    getChildContext () {
      return {
        store: this.props.store
      }
    }
  
    render () {
      return (
        <div>{this.props.children}</div>
      )
    }
  }
