import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MainPage from '../pages/homePage/MainPage';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

function Header() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role")
        setTimeout(() => {
            navigate("/login")
        })
    }

    const HeaderLogin = () => {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand> <Link to="/" className="orange">Kai Yoga</Link></Navbar.Brand>
                        <Navbar.Toggle className="orange" aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav>
                                <Link to="/login" className='login orange'>Login  </Link>
                                <Link eventKey={2} Link to="/register" className="orange">
                                    Registro
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }

    const HeaderUserLogged = () => {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand> <Link to="/home" className="orange">Kai Yoga</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav><Link to="/listProduct" className='product-text orange'>Productos</Link></Nav>
                                <NavDropdown title="Clases" className='clases-text orange' id="collasible-nav-dropdown">
                                    <NavDropdown.Item> <Link to="/listLesson" className="orange">Clases</Link></NavDropdown.Item>
                                    <NavDropdown.Item> <Link to="/listTeacher" className="orange">Profesores</Link></NavDropdown.Item>
                                    <NavDropdown.Item> <Link to="/newReserve" className="orange">Reserva tu clase</Link></NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav>
                                    <Nav><Link to="/home" onClick={logOut} className="orange">Logout</Link></Nav>
                                </Nav>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }

    const HeaderAdmin = () => {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar>
                            <Link to="/admin" className="orange">Kai Yoga Administrador</Link></Navbar>
                            <Nav>
                            <Link to="/home" onClick={logOut} className="orange">Logout</Link>                            </Nav>
                        
                    </Container>
                </Navbar>
            </div>
        )
    }

    let nav = role == 0 ? HeaderUserLogged() : role == 1 ? HeaderAdmin() : HeaderLogin()
    return (
        <div>

            {nav}
        </div>
    )
}



export default Header