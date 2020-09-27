import React from 'react'

export default function Contact() {
    return (
        <article className="contact">
            
            <div className="contact__container">

                <h2 className="contact__title">¿En dónde nos puedes conseguir?</h2>

                <section className="contact__section">

                    <div className="contact__googleMap">
                        <iframe title="contact__map" className="uu" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.8690145973355!2d-66.97663832881113!3d10.43196747350961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2af51636033ac3%3A0x55e9e711a86e4af4!2sQueseras%20Del%20Medio%20Terraza%20A!5e0!3m2!1ses-419!2sve!4v1571896782437!5m2!1ses-419!2sve" frameborder="0" allowfullscreen=""></iframe>
                    </div>

                    <p className="contact__description">
                        Visítanos en UD4 Caricuao o Contáctanos
                    </p>

                    <p className="contact__description">
                        ☎ 0416 8107251 / 0212 4313155
                    </p>

                </section>

            </div>

        </article>
    )
}
