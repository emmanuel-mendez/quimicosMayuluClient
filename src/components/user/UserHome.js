import React from 'react'
import { useAuthState } from '../../context/auth'
import {Link} from 'react-router-dom'


export default function UserHome() {

    const { user } = useAuthState()

    return (
        <article className="userHome">
            
            <div className="userHome__container">

                <h2 className="userHome__title">Bienvenido {user.username} </h2>

                <section className="userHome__section">

                    <p className="userHome__description">
                        Trabajamos pensando en ti, gracias por formar parte de la comunidad de Químicos Mayulu. Tenemos novedades para ti...
                    </p>

                    <p className="userHome__description">
                        Revisa la nueva sección de <Link className="messagesInfo__descriptionLink" to="/messages">Mensajes</Link>
                    </p>

                </section>

            </div>

        </article>
    )
}
