import { createElement, memo } from "react";

// export default 
const FormElement = memo(({attributes, handleChange, position, styles}) => {
    const { name, type, human_label: humanLabel, tag, required, id = `${name}-${position}`, value = ''} = attributes
    const actionType = type === ('checkbox' && 'HANDLE_CHECKBOX') || 'HANDLE_INPUT'

    const generatedTag = createElement(
        tag || 'input', 
        {
            type,
            name,
            id: id,
            required: !!required,
            value,
            onChange: handleChange(actionType, position),
            className: styles.text
        }
      );
    return (
        <div className={styles.element}>
            <label htmlFor={id}>{humanLabel}: </label>
            <div>
                {generatedTag}
            </div>
        </div>
    )
})
  
export default FormElement