import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import classNames from 'classnames';

import { useAuthDispatch } from '../../context/auth'

const LOGIN_USER = gql`
    query login(
        $username: String!,
        $password: String!
    ) {
        login(
            username: $username,
            password: $password
        ) {
            username
            email
            createdAt
            token
        }
    }
`

export default function Login() {

    const [variables, setVariables] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const dispatch = useAuthDispatch()

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onError: (err) => {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        onCompleted(data) {
            dispatch({ type: 'LOGIN', payload: data.login })
            window.location.href = '/userHome'
        }
    })

    const submitLoginForm = (e) => {
        e.preventDefault()

        loginUser({ variables })
    }

    return (
        <article className="login">
            <div className="login__container">

                <h2 className="login__title">Iniciar sesión</h2>

                <form className="login__form" onSubmit={submitLoginForm}>

                    <div className="login__formSection">
                        <input
                            type="text"
                            placeholder={errors.username ? (
                                errors.username
                            ) : (
                                'Usuario'
                            )}
                            value={variables.username}
                            className={classNames('{errors.username} login__input', {
                                'loginError': errors.username || errors.login
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, username: e.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="login__formSection">
                        <input
                            type="password"
                            placeholder={errors.password ? (
                                errors.password
                            ) : ('Contraseña')}
                            value={variables.password}
                            className={classNames('{errors.password} login__input', {
                                'loginError': errors.password || errors.login
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, password: e.target.value }
                                )
                            }
                        />
                    </div>

                    <button
                        className="login__button"
                        type="submit"
                        disabled={loading}>
                        {loading ? 'Cargando...' : ('Login')}
                    </button>

                    <p className="login__descriptionRegister">
                        ¿No tienes una cuenta aún? <Link className="login__registerLink" to="/register">Regístrate</Link>
                    </p>

                </form>

                <div
                    className={classNames('login__error', {
                        'loginError': errors.login
                    })}>
                    {errors.login ? (errors.login) : (null)}
                </div>

            </div>
        </article>
    )
}
