import React from 'react'
import team from '../../image/team.png';

export default function Team() {
	return (
		<article className="team">

			<div className="team__container">

				<h2 className="team__title">¿Quiénes conforman nuestro equipo?</h2>

				<section className="team__section">

					<p className="team__description">
						Nuestro equipo está administrado y dirigido por Brito P. y consta de un total de tres empleados de calidad que estarán encantados en atenderte.
					</p>

					<img src={team} alt="team" className="team__image" />

				</section>

			</div>

		</article>
	)
}
