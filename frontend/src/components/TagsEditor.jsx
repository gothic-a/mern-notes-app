import { useState, useEffect } from 'react'

const TagsEditor = () => {
    const [editable, setEditable] = useState(false)
    const [editableTag, setEditableTag] = useState('')
    const [editableInput, setEditableInput] = useState('')
    const [editableInputValue, setEditableInputValue] = useState('')

    const [addTag, setAddTag] = useState('')

    const print = ({...args}) => {
        console.log(args)
    }

    useEffect(() => {
        if(editable && editableTag && editableInput && editableInputValue) {
            editableTag.classList.add('editable')

            editableTag.querySelector('.tags__item-controls')
            editableInput.value = editableInputValue
            editableInput.focus()
            editableInput.addEventListener('keydown', onEditableInputChange)
        } 
    }, [editable, editableTag, editableInput, editableInputValue])

    const onEditableInputChange = (e) => {
        setEditableInputValue(e.target.value)
    }

    const reset = () => {
        editableTag.classList.remove('editable')
        editableInput.removeEventListener('keydown', onEditableInputChange)
        setEditableTag('')
        setEditableInput('')
        setEditableInputValue('')
        setEditable(false)
    }

    const tagsClickHandler = (e) => {
        if(e.target.dataset.type === 'edit') {
            if(document.activeElement === editableInput) {
                e.preventDefault()
                editableInput.blur()
            }

            const tag = e.target.closest('.tags__item')
            if(tag !== editableTag) {
                setEditable(true)
                setEditableTag(tag)
                setEditableInputValue(tag.dataset.value)

                const input = tag.querySelector('input.edit')
                setEditableInput(input)
            }
        } else if(e.target.dataset.type === 'done') {
            if(document.activeElement === editableInput) {
                e.preventDefault()
                print({
                    id: editableTag.dataset.id,
                    value: editableInputValue,
                })
                editableInput.blur()
            }
        } 
    }

    const addClickHandler = () => {

    }

    return (
        <div className="tags-editor">
            <ul 
                className="tags"
                onMouseDown={tagsClickHandler}
            >
                <li className="tags__item" data-id="1" data-value="nastia dj">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">nastia dj</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
                <li className="tags__item" data-id="1" data-value="nina kraviz">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">nina kraviz</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
                <li className="tags__item" data-id="1" data-value="shopping">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">shopping</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
                <li className="tags__item" data-id="1" data-value="nastia dj">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">nastia dj</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
                <li className="tags__item" data-id="1" data-value="nastia dj">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">nastia dj</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
                <li className="tags__item" data-id="1" data-value="nastia dj">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">nastia dj</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
                <li className="tags__item" data-id="1" data-value="nastia dj">
                    <div className="tags__item-text">
                        <input 
                            className='edit' 
                            type='text'
                            onBlur={reset}
                        /> 
                        <p className="text">nastia dj</p>
                    </div>
                    
                    <div className="tags__item-controls">
                        <i 
                            className="far fa-check done"
                            data-type="done"
                        ></i>
                        <i 
                            className="fas fa-pen pen"
                            data-type="edit"
                        ></i>
                        <i className="far fa-trash trash"></i>
                    </div>
                </li>
            </ul>
            <div className="add-tag">
                <input 
                    type="text" 
                    className="add-tag__input" 
                    value={addTag}
                    onChange={e => setAddTag(e.target.value)}
                    placeholder="add new tag"
                />
                <i 
                    className="far fa-check add-tag__done"
                    onClick={addClickHandler}
                ></i>
            </div>
        </div>
    )
}

export default TagsEditor