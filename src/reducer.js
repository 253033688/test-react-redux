// const stateChanger = (state, action) => {
const reducer = (state, action = {}) => {
if (!state) {
    return {
        themeColor: ''
    }
}

switch (action.type) {
    case 'CHANGE_COLOR':
        return {
            ...state,
            themeColor: action.themeColor
        }
    default:
        return state
    }
}

export default reducer