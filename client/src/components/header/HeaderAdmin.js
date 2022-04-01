import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MainPage from '../pages/homePage/MainPage';
import { NavLink, Link} from 'react-router-dom';

function HeaderAdmin() {

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role")

    }
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar><Link to="/admin">Kai Yoga Administrador</Link></Navbar>
                        <Nav>
                            <Nav><Link to="/home" onClick={logOut}>Logout</Link></Nav>
                        </Nav>
                </Container>
            </Navbar>
        </div>
    )
}



export default HeaderAdmin