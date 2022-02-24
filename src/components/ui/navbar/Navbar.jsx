import { useEffect, useState } from 'react'
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
    const [showMenu, setShowMenu] = useState(false)

    // Apartir de que la pantalla mida 1350 se cambia el menu

    //TODO: se tiene que cargar la info en algun estado
    // const options = [
    //     'one', 'two', 'three'
    // ];

    const onSelect = ({ value }) => {
        setValueDrop(value)
        setShowMenu(false)
        navigation(`/categories/${ value }`)
    }

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    const classNameMenu = classNames(styleNavbar.containerOptionsNav, {
        [styleNavbar.containerOptionsNavActive]: showMenu
    })

    useEffect(() => {
        getGenres().then(res => {
            const opt = res.map(genre => genre.name)
            setOptions([...opt])
        })
    }, [])
    
    
    useEffect(() => {
        if(!pathname.includes('/categories')){
            setValueDrop('Categorías')
            setShowMenu(false)
        }
    }, [pathname])


    return (
        <nav className={ classNames('grid', styleNavbar.nav, 'grid-nogutter') }>
            <div className={ classNames(styleNavbar.sizeLogo, 'col-fixed') }>
                <Link to="/">
                    <img src={logo} width={246} height={170} alt="MovieAPP logo" />
                </Link>
            </div>

            <div className={ classNames(styleNavbar.menu, 'col') }>

                <div onClick={handleShowMenu} className={styleNavbar.menuOption}>
                    <i className="fa-solid fa-bars"></i>
                </div>


                <div className={classNameMenu}>
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