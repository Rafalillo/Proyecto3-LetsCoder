import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Facebook  from "./icons/facebook.png";
import Instagram from "./icons/instagram.png";
import Twitter from "./icons/twitter.png"

 
function Footer() {
  return (
    <div>
        <div className="container" bg="dark" variant="dark">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <svg className="bi" width="30" height="24"></svg>
                    </a>
                    <span className="text-muted">© 2022 Rafa S.L. Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="text-muted" href="#"><img className='icons-footer' src={Facebook} /> </a></li>
                <li className="ms-3"><a className="text-muted" href="#"><img className='icons-footer' src={Instagram} /></a></li>
                <li className="ms-3"><a className="text-muted" href="#"><img className='icons-footer' src={Twitter} /></a></li>
              </ul>
            </footer>
        </div> 
    </div>
  )
}

export default Footer;
