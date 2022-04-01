import React from "react";
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";


function Admin() {

    return (
        <Container>
            <HeaderAdmin />
            <div>
                <Row xs={1} md={2} className="g-4">

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>OPCIONES DE PRODUCTOS</Card.Title>
                                <Card.Text>
                                    <div>
                                        <ul>
                                            <li className="list-admin">
                                                <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/newProduct">
                                                    Alta producto
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/modifyProduct">
                                                    Modificar producto
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/deleteProduct">
                                                    Borrar producto
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                                <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/listProduct">
                                                    Listado de productos
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>OPCIONES DE CLASES</Card.Title>
                                <Card.Text>
                                    <div>
                                        <ul>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/newLesson">
                                                    Alta nueva clase
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/modifyLesson">
                                                    Modificar clase
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/deleteLesson">
                                                    Borrar clase
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/listLesson">
                                                    Listado de clases
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>OPCIONES DE PROFESORES</Card.Title>
                                <Card.Text>
                                    <div>
                                        <ul>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/newTeacher">
                                                    Alta nuevo profesor
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/modifyTeacher">
                                                    Modificar profesor
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/deleteTeacher">
                                                    Borrar profesor
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/listTeacher">
                                                    Listado de profesores
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="user-list">
                            <Card.Body>
                                <Card.Title>OPCIONES DE USUARIO</Card.Title>
                                <Card.Text>
                                    <div>
                                        <ul>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin-user"
                                                    role="button"
                                                    to="/listUser">
                                                    Listado de usuarios
                                                </Link>
                                            </li>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/deleteUser">
                                                    Borrar usuario
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />
        </Container>
    )
}



export default Admin;