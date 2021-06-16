function init(state, elements) {
    return { ...state, elements };
  }

const reducer = (state, action) => {
    let elem
    switch (action.type) {
        case 'HANDLE_INPUT':
        case 'HANDLE_CHECKBOX':
            elem = state.elements[action.position]
            return {
                ...state,
                elements: { ...state.elements, [action.position]: { ...elem, value: action.payload } }
            }
        case 'LOAD_FORM_ELEMENTS':
            return {
                ...state,
                elements: { ...action.payload }
            }
        case 'RESET_FORM':
            return init(state, action.payload)
        default:
            throw new Error('Not a valid action type')
    }
}


export default reducer
