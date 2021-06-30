import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setSearchQuery } from "../actions/notesActions"

const useDebounce = (value) => {
    const [debouncedValue, setDebauncedValue] = useState('') 

    useEffect(() => {

        const timeout = setTimeout(() => {
            return setDebauncedValue(value)
        }, 400)

        return () => clearTimeout(timeout)
    })

    return debouncedValue
}

const SearchBar = () => {
    const { getNotes: { loading } } = useSelector(state => state.notes)

    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    const search = useDebounce(searchValue)
    
    useEffect(() => {
        if(typeof(search) === 'string' && !loading) {
            dispatch(setSearchQuery(search))
        }
    }, [search])

    return (
        <div className="search-bar">
            <input 
                className="search-bar__input" 
                type="text" 
                placeholder='type to search'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
        </div>
    )
}

export default SearchBar