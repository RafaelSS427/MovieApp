import { useEffect, useRef, useState } from 'react'
import Dropdown from 'react-dropdown'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import classNames from 'classnames'

import logo from '../../../assets/logo.png'
import styleNavbar from './styleNavbar.module.css'
import { Search } from '../search/Search'
import { getGenres } from '../../../api/apiReq'


export const Navbar = () => {
    const navigation = useNavigate()
    const { pathname } = useLocation()
    const [visible, setVisible] = useState(false)
    const [options, setOptions] = useState([])
    const [valueDrop, setValueDrop] = useState("Categorías")

    // Apartir de que la pantalla mida 1350 se cambia el menu

    //TODO: se tiene que cargar la info en algun estado
    // const options = [
    //     'one', 'two', 'three'
    // ];

    const onSelect = ({ value }) => {
        setValueDrop(value)
        navigation(`/categories/${ value }`)
    }

    useEffect(() => {
        getGenres().then(res => {
            const opt = res.map(genre => genre.name)
            setOptions([...opt])
        })
    }, [])
    
    
    useEffect(() => {
        if(!pathname.includes('/categories')){
            setValueDrop('Categorías')
        }
    }, [pathname])
    

    return (
        <nav className={ classNames('grid', styleNavbar.nav, 'grid-nogutter') }>
            <div className={ classNames(styleNavbar.sizeLogo, 'col-fixed') }>
                <img src={logo} width={246} height={170} alt="MovieAPP logo" />
            </div>

            <div className={ classNames(styleNavbar.menu, 'col') }>

                <div className={styleNavbar.containerOptionsNav}>
                    <ul className={ styleNavbar.ul }>
                        <li className={ classNames(styleNavbar.li, styleNavbar.hoverLi) }>
                            <Link to="/" className={ styleNavbar.link }>Inicio</Link>
                        </li>
                        <li style={{height: '100%', width: 'auto'}} className={ classNames(styleNavbar.li, 'flex', 'align-items-center', 'justify-content-center') }>
                            <Dropdown options={options} onChange={onSelect} value={valueDrop} />
                            {/* <Link to="/categories" className={ styleNavbar.link }>Categorías</Link>           */}
                        </li>
                        <li className={ classNames(styleNavbar.li, styleNavbar.hoverLi) }>
                            <Link to="/comingsoon" className={ styleNavbar.link }>Próximamente</Link>          
                        </li>
                    </ul>

                    <div className={styleNavbar.options}>

                        {
                            visible ? (
                                <i 
                                    className="fa-solid fa-xmark fa-2x"
                                    onClick={() => setVisible(!visible)}
                                ></i>
                                ) : (
                                <i 
                                    className="fa-solid fa-magnifying-glass fa-2x"
                                    onClick={() => setVisible(!visible)}
                                ></i>
                                )
                        }
                            <Search visible={visible}/>
                    </div>
                </div>
                
            </div>
        </nav>
    )
}