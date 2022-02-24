import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import stylesSearch from './stylesSearch.module.css'

export const Search = ({ visible }) => {
    const navigate = useNavigate()
    const inputRef = useRef()

    const classShow = classNames({
        [stylesSearch.showInput]: visible,
        [stylesSearch.hideInput]: !visible
    })

    useEffect(() => {
        const input = inputRef.current  
        if(visible){
            input.focus()
        } else {
            input.value = ''
        }

    }, [visible])

    const handleonSubmit = (e) => {
        e.preventDefault()
        const { search } = e.target.elements

        navigate(`/movie/${search.value}`);
    }

    return(
        <form onSubmit={handleonSubmit}>
            <input
                name="search" 
                className={ classNames(stylesSearch.input, classShow) } 
                type="text" 
                placeholder="Buscar..."
                ref={inputRef}
            />
        </form>
    )
}