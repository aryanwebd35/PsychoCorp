import React from 'react'

const Footer = () => {
    return (
        <div>
        <hr/>
        <footer>
            <div className="footer-content">
                <h3>PsychoCorp</h3>
                <p>The road to mental health begins with you; but it helps to know you're not alone.We believe that individuals become empowered to help themselves and others when they feel a part of something larger. Our free online support community offers members a convenient and safe place to connect. Join the larger conversation on wellness and peer support, or limit your interactions to your core support group(s)-the choice is yours.

                </p>
                <ul className="socials">
                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    <li><a href="#"><i className="fa fa-linkedin-square"></i></a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>copyright &copy; <a href="#">Foolish Developer</a>  </p>
                <div className="footer-menu">
                    <ul className="f-menu">
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">Blog</a></li>
                    </ul>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default Footer
