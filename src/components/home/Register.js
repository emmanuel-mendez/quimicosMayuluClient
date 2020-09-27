import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import classNames from 'classnames';

const REGISTER_USER = gql`
    mutation register(
        $admin: String!
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            admin: $admin,
            username: $username,
            email: $email,
            password: $password,
            confirmPassword: $confirmPassword
        ) {
            id
            admin
            email
            username
            createdAt
            token
        }
    }
`;

export default function Register(props) {

    const [variables, setVariables] = useState({
        admin: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, __) {
            props.history.push('/login')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
    })

    const submitRegisterForm = (e) => {
        e.preventDefault()

        registerUser({ variables })
    }

    return (
        <article className="register">
            <div className="register__container">

                <h2 className="register__title">Regístrate</h2>

                <form className="register__form" onSubmit={submitRegisterForm}>

                    <div className="register__formSection">
                        <label className="{errors.email} register__label">
                            {errors.email ?? 'Email'}
                        </label>
                        <input
                            type="email"
                            placeholder="Ej. mayulu@mayulu.com"
                            value={variables.email}
                            className={classNames('{errors.email} register__input', {
                                'registerError': errors.email
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, email: e.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="register__formSection">
                        <label className="{errors.username} register__label">
                            {errors.username ?? 'Usuario'}
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. mayulu"
                            value={variables.username}
                            className={classNames('{errors.username} register__input', {
                                'registerError': errors.username
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, username: e.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="register__formSection">
                        <label className="{errors.password} register__label">
                            {errors.password ?? 'Contraseña'}
                        </label>
                        <input
                            type="password"
                            placeholder="*****"
                            value={variables.password}
                            className={classNames('{errors.password} register__input', {
                                'registerError': errors.password
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, password: e.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="register__formSection">
                        <label className="{errors.confirmPassword} register__label">
                            {errors.confirmPassword ?? 'Confirme contraseña'}
                        </label>
                        <input
                            type="password"
                            placeholder="*****"
                            value={variables.confirmPassword}
                            className={classNames('{errors.confirmPassword} register__input', {
                                'registerError': errors.confirmPassword
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, confirmPassword: e.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="register__formSection">
                        <label className="{errors.admin} register__label">
                            {errors.admin ?? 'Permisos'}
                        </label>
                        <select required
                            value={variables.admin}
                            className={classNames('{errors.admin} register__input', {
                                'registerError': errors.admin
                            })}
                            onChange={
                                e => setVariables(
                                    { ...variables, admin: e.target.value }
                                )
                            }
                        >
                            <option> {errors.admin ?? 'Usuario o administrador'} </option>
                            <option value="false">Usuario</option>
                            <option value="true" >Administrador</option>
                        </select>
                    </div>

                    <button
                        className="register__button"
                        variant="success"
                        type="submit"
                        disabled={loading}>

                        {loading ? 'Cargando...' : 'Sing up'}
                    </button>

                    <p className="register__descriptionLogin">
                        ¿Ya posees una cuenta? <Link className="register__loginLink" to="/login">Inicia sesión</Link>
                    </p>

                </form>
            </div>
        </article>
    )
}
