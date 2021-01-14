import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

	return (
		<article className="home">
			<div className="home__container">

				<div className="home__banner">
					<div className="banner__container">
						<div className="banner__titleContainer">
							<h2 className="banner__title">Mayulu Shop</h2>
							<p className="banner__subtitle">Servicio de calidad</p>
						</div>

						<div className="home__buttonsDesktop">

							<div className="home__buttonsDescriptionDesktop">
								<p className="home__buttonsDescriptionParagraphDesktop">Los productos de limpieza que necesitas están a un click.</p>
								<p className="home__buttonsDescriptionParagraphDesktop">Inicia sesión o regístrate para ir de compras, formar parte de nuestra comunidad y mucho más...</p>
							</div>

							<div className="home__buttonsContainerDesktop">

								<Link to="/login">
									<button className="home__buttonLoginDesktop home__buttonDesktop">
										Iniciar sesión
									</button>
								</Link>

								<Link to="/register">
									<button className="home__buttonLoginDesktop home__buttonDesktop">
										Registrarse
                  </button>
								</Link>
							</div>
						</div>

						<div className="banner__arrowContainer">
							<a href="#home__buttonsMobile">
								<i class="banner__downArrow fas fa-chevron-down"></i>
							</a>
						</div>
					</div>
				</div>

				<div className="home__buttonsMobile" id="home__buttonsMobile">

					<div className="home__buttonsDescriptionMobile">
						<h2 className="home__buttonsTitleDescriptionMobile">¡Bienvenido!</h2>
						<p className="home__buttonsDescriptionParagraphMobile">Los productos de limpieza que necesitas están a un click.</p>
						<p className="home__buttonsDescriptionParagraphMobile">Inicia sesión o regístrate para ir de compras, formar parte de nuestra comunidad y mucho más...</p>
					</div>

					<div className="home__buttonsContainerMobile">

						<Link to="/login">
							<button className="home__buttonLoginMobile home__buttonMobile">
								Iniciar sesión
              </button>
						</Link>

						<Link to="/register">
							<button className="home__buttonRegisterMobile home__buttonMobile">
								Registrarse
              </button>
						</Link>
					</div>
				</div>

			</div>
		</article>
	)
}
