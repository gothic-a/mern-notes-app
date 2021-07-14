import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
    createTag,
    deleteTag,
    updateTag,
    resetUpdate
} from '../actions/tagsActions'

import EmptyScreen from './EmptyScreen'
import Loader from './Loader'

const TagsEditor = () => {
    const dispatch = useDispatch()
    const { 
        tagsList, 
    } = useSelector(state => state.tags)
    const { 
        tagsUpdate: { 
            loading: updateLoading, 
            success: updateSuccess 
        },
        tagsCreate: { 
            loading: createLoading, 
        },
        tagsDelete: { 
            loading: deleteLoading, 
        }  
    } = useSelector(state => state.tags)

    const [editable, setEditable] = useState(false)
    const [editableTag, setEditableTag] = useState('')
    const [editableInput, setEditableInput] = useState('')
    const [editableInputValue, setEditableInputValue] = useState('')

    const [newTag, setNewTag] = useState('')

    useEffect(() => {
        if(editable && editableTag && editableInput && editableInputValue) {
            editableTag.classList.add('editable')
            editableTag.querySelector('.tags__item-controls')
            editableInput.value = editableInputValue
            editableInput.focus()
            editableInput.addEventListener('keyup', onEditableInputChange)
        } 
    }, [editable, editableTag, editableInput, editableInputValue])

    useEffect(() => {
        if(editableInput && updateSuccess) {
            editableInput.blur()
        }
    }, [editableInput, updateSuccess])

    const onEditableInputChange = (e) => {
        setEditableInputValue(e.target.value)
    }

    const reset = () => {
        editableTag.classList.remove('editable')
        editableInput.removeEventListener('keyup', onEditableInputChange)
        setEditableTag('')
        setEditableInput('')
        setEditableInputValue('')
        setEditable(false)
    }

    const tagsClickHandler = (e) => {
        if(e.target.dataset.type === 'edit') {
            dispatch(resetUpdate())
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
                updateHandler({
                    id: editableTag.dataset.id,
                    newName: editableInputValue,
                })
            }
        } else if(e.target.dataset.type === 'delete') {
            const id = e.target.closest('.tags__item').dataset.id
            deleteHandler(id)
        }
    }

    const updateHandler = ({...tag}) => {
        dispatch(updateTag(tag))
    }

    const deleteHandler = (id) => {
        dispatch(deleteTag(id))
    }

    const addClickHandler = () => {
        dispatch(createTag(newTag))
        setNewTag('')
    }

    return (
        <div className="tags-editor">
            {
                tagsList.length !== 0 
                ? (
                    <ul 
                        className="tags"
                        onMouseDown={tagsClickHandler}
                    >
                        {
                            tagsList.map(t => (
                                <li 
                                    className="tags__item" 
                                    data-id={t._id} 
                                    data-value={t.name}
                                    key={t._id}
                                >
                                    <div className="tags__item-text">
                                        <input 
                                            className='edit' 
                                            type='text'
                                            onBlur={reset}
                                        /> 
                                        <p className="text">{t.name}</p>
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
                                        <i 
                                            className="far fa-trash trash"
                                            data-type="delete"
                                        ></i>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                ) : <EmptyScreen>you can add new tag!</EmptyScreen>
                
            }
            <div className="add-tag">
                <input 
                    type="text" 
                    className="add-tag__input" 
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    placeholder="add new tag"
                />
                {
                    updateLoading || deleteLoading || createLoading 
                        ? <Loader></Loader>
                        : (
                            <i 
                                className="far fa-check add-tag__done"
                                onClick={addClickHandler}
                            ></i>
                        )
                }
            </div>
        </div>
    )
}

export default TagsEditor