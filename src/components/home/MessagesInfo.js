import React from 'react'
import {Link} from 'react-router-dom'

export default function MessagesInfo() {
    return (
        <article className="messagesInfo">
            
            <div className="messagesInfo__container">

                <h2 className="messagesInfo__title">Incorporamos mensajes a nuestra plataforma</h2>

                <section className="messagesInfo__section">

                    <p className="messagesInfo__description">
                    Estamos desarrollando una sección de mensajes instantaneos entre los usuarios que se hayan registrado.  Dicha sección será adaptable a smartphones, tabletas y monitores. De igual forma, permitirá que los usuarios puedan comunicarse cuando deseen y puedan crear una comunidad que aporte quejas, ideas y medios para la empresa.
                    </p>

                    <p className="messagesInfo__description">
                    <Link className="messagesInfo__descriptionLink" to="/register">Regístrate</Link> para que seas uno de los primeros en usar nuestra sección de mensajes.
                    </p>

                </section>

            </div>

        </article>
    )
}
