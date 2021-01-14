import React from 'react'
import { Link } from 'react-router-dom'
import about from '../../image/quimicosMayulu.png';

export default function About() {
	return (
		<article className="about">

			<div className="about__container">

				<h2 className="about__title">¿Qué es Químicos Mayulu?</h2>

				<section className="about__section">

					<p className="about__description">
						Químicos Mayulu C. A. es una empresa que se preocupa por brindarte los mejores productos de limpieza al mejor precio. <Link className="about__descriptionLink" to="/contact">Contáctanos</Link> o visita nuestras redes sociales para más información
					</p>

					<img src={about} alt="Logo" className="about__image" />

				</section>

			</div>

		</article>
	)
}
