import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../../context/auth'
import classNames from 'classnames';

export default function Header() {

    const [toggle, setToggle] = useState(false)

    const authDispatch = useAuthDispatch()
    const { user } = useAuthState()

    const logout = () => {
        authDispatch({ type: 'LOGOUT' })
    }

    let Nav

    if(user && user.admin === true) {
        Nav =

        <nav className={classNames('nav', {
            'menuShow': toggle
        })}>
            <ul className="nav__menu">

            <Link className="menu__link" to="/products">
                <li className="menu__item">
                        Gestiona productos
                </li>
            </Link>

            <Link className="menu__link" to="/messages">
                <li className="menu__item">
                        Mensajes
                    <i class=" menu__linkExclamation fas fa-exclamation"></i>
                </li>
            </Link>

                <li className="menu__item">
                    <Link className="menu__link" to="/login" onClick={logout}>
                        Cerrar sesión
                    </Link>
                </li>
            </ul>
        </nav>

    } else if (user && user.admin === false) {
        Nav =

        <nav className={classNames('nav', {
            'menuShow': toggle
        })}>
            <ul className="nav__menu">

            <Link className="menu__link" to="/products">
                <li className="menu__item">
                        Productos
                </li>
            </Link>

            <Link className="menu__link" to="/messages">
                <li className="menu__item">
                        Mensajes
                    <i class=" menu__linkExclamation fas fa-exclamation"></i>
                </li>
            </Link>

            <Link className="menu__link" to="/login" onClick={logout}>
                <li className="menu__item">
                        Cerrar sesión
                </li>
            </Link>
            </ul>
        </nav>
    }

    else {
        Nav =

        <nav className={classNames('nav', {
            'menuShow': toggle
        })}>
            <ul className="nav__menu">

            <Link className="menu__link" to="/contact" >
                <li className="menu__item">
                        Contacto
                </li>
            </Link>

            <Link className="menu__link" to="/products" >
                <li className="menu__item">
                        Productos
                </li>
            </Link>

            <Link className="menu__link" to="/messagesInfo" >
                <li className="menu__item">
                        Mensajes

                    <i class=" menu__linkExclamation fas fa-exclamation"></i>
                </li>
            </Link>

                <Link className="menu__link menu__registerLink" to="/register" >
                    <li className="menu__item menu__register">
                        Registrarse
                    </li>
                </Link>
                
                <Link className="menu__link menu__loginLink" to="/login" >
                    <li className="menu__item menu__login">
                        Inicar sesión
                    </li>
                </Link>
            </ul>
        </nav>
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logoContainer">
                    {!user ? (
                        <Link className="menu__link" to="/" >
                            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo EDteam" className="header__logo" />
                        </Link>
                    ) : (
                        <ul className="nav__username">
                            <li className="menu__username">
                                <Link className="menu__usernameLink" to="/userHome">
                                    {user.username}
                                </Link>
                            </li>
                        </ul>
                    )}
                <h1 className="header__title">Mayulu Shop</h1>
            </div>

            <div className="header__menuToggleContainer">
                <div as="button" onClick={() => setToggle(!toggle)} className="header__menuToggle">
                </div>
            </div>

                {Nav}

            </div>
        </header>
    )
}
