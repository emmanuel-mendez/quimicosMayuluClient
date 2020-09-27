import React from 'react'
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer__container">
                <div className=" footer__section footer__location">
                    <div className="footer__networkContainer footer__sectionContainer">
                        <h2 className="footer__h2">Químicos Mayulu</h2>
                        <p className="footer__underline">Caracas - Venezuela</p>
                    </div>
                </div>

                <div className=" footer__section footer__network">
                    <div className="footer__networkContainer footer__sectionContainer">
                        <h2 className="footer__h2">Redes sociales</h2>

                        <div className="footer__social  footer__underline footer__facebook">
                            <div className="footer__facebookContainer footer__socialContainer">
                                <a href="https://www.facebook.com/Quimicos-Mayulu-113545437167309" target="_blank" rel="noopener noreferrer" className="footer__socialLink">
                                <i class="footer__socialLogo fab fa-facebook-f"></i>
                                <p className="footer__socialDescription">Facebook</p>
                                </a>
                            </div>
                        </div>


                        <div className="footer__social  footer__underline footer__instagram">
                            <div className="footer__instagramContainer footer__socialContainer">
                                <a href="https://www.instagram.com/quimicosmayulu/" target="_blank" rel="noopener noreferrer" className="footer__socialLink">
                                    <i class="footer__socialLogo fab fa-instagram"></i>
                                    <p className="footer__socialDescription">Instagram</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" footer__section footer__enterprise">
                    <div className="footer__enterpriseContainer footer__sectionContainer">
                        <h2 className="footer__h2">Acerca de la empresa</h2> 
                        <p className="footer__linkContainer footer__underline"><Link to="/about" className="footer__link">¿Qué es Químicos Mayulu?</Link></p>
                        <p className="footer__linkContainer footer__underline"><Link to="/team" className="footer__link">Equipo</Link></p>
                        <p className="footer__linkContainer footer__underline"><Link to="/principles" className="footer__link">Nuestros principios</Link></p>
                    </div>
                </div>
            </div>

        </footer>
    )
}
