import React from 'react'
import principlesImage from '../../image/principles.png'

export default function Principles() {
	return (
		<article className="principles">

			<div className="principles__container">

				<h2 className="principles__title">¿Cuáles son nuestros principios?</h2>

				<section className="principles__section">

					<p className="principles__description">
						Nos esforzamos cada día por ofrecerte una atención educada y amigable, los mejores productos de limpieza por precios significativamente asequibles y una mano amiga comprometida con la limpieza de tu hogar.
					</p>

					<img src={principlesImage} alt="Imágen de principios" className="principles__image" />

				</section>

			</div>

		</article>
	)
}
