import { useReducer, useEffect } from 'react'
import reducer from './reducer'
import FormElement from './element'
import exampleFormElements from '../../data/formFields.example'
import styles from './form.module.css'

const initialState = {
    elements: {}
}

export default function Form() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        loadFormElements().then(elements => {
            const mappedElements = elements.reduce((accum, val, i) => {
                return { ...accum, [i]: val }
            }, {})
            dispatch({
                type: 'LOAD_FORM_ELEMENTS',
                payload: mappedElements
            })
        })
    }, [])

    const loadFormElements = () => {
        return new Promise((resolve) => resolve(exampleFormElements))
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const inputs = Object.values(elements)
        let payload = {}
        for (const input of inputs) {
            if (!input.value) continue
            payload[input.name] = input.value
        }
        console.log('Form Payload being submitted', payload)
        loadFormElements().then(elements => {
            const mappedElements = elements.reduce((accum, val, i) => {
                return { ...accum, [i]: val }
            }, {})
            dispatch({
                type: 'RESET_FORM',
                payload: mappedElements
            })
        })
    }

    const handleChange = (type, position) => (event) => {
        const payload = type === ('HANDLE_CHECKBOX' && event.target.checked) || event.target.value
        dispatch({ type, field: event.target.name, position, payload })
    }

    const manageConditionalField = ({ name, show_if: showIf }) => {
        let shouldRender = false
        let matchingField = fetchElementByName(name)
        if (matchingField) {
            let checkedCondition = (typeof showIf === 'function' && showIf(matchingField.value)) || false
            if (checkedCondition) {
                shouldRender = true
            }
        }
        return shouldRender
    }

    const fetchElementByName = (name) => {
        const field = Object.values(state.elements).filter(elem => elem.name === name)
        return (field && field[0]) || null
    }

    const { elements } = state
    return (
        Object.entries(elements).length && (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
            {Object.entries(elements).map(([key, value]) => {
                if (!!value['conditional']) {
                    let shouldRenderElement = false
                    shouldRenderElement = manageConditionalField(value.conditional)
                    return shouldRenderElement && <FormElement key={key} attributes={value} position={key} handleChange={handleChange} styles={styles} />
                } else {
                    return <FormElement key={key} attributes={value} position={key} handleChange={handleChange} styles={styles} />
                }
            })}
            <div>
            <button type="submit" className={styles.submit}>
                Submit
          </button>
            </div>
        </form>
        </div>
        )
    )
}
