import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Card } from "react-bootstrap";


function MainPage() {

    const [products, setProducts] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const [users, setUsers] = useState({});
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userIdMemory");

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("/api/products", {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response);
                setProducts(response.data.product);
                setProductImage(response.data.product.image);
            } catch (error) {

            }

        }
        getProducts();
        const getUsers = async () => {
            try {
                const res = await axios.get("/api/user", {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(res);
                setUsers(res.data.users)
                
            } catch (error) {

            }

        }
        getUsers()
    }, [])

    const MainLogged = () => {
        return (
            <div>
            <Header />
                <Row xs={1} md={2} className="g-4">

                    <Col>
                        <Card className="card-admin">
                            <Card.Body>
                                
                                <Card.Text>
                                    <div>
                                        <ul>
                                            
                                            
                                            <li className="list-admin">
                                                <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/listProduct">
                                                    Ver productos
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card-admin">
                            <Card.Body>
                                                               <Card.Text>
                                    <div>
                                        <ul>
                                                                                      
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/listLesson">
                                                    Ver clases
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card-admin">
                            <Card.Body>
                                
                                <Card.Text>
                                    <div>
                                        <ul>
                                            
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
                        <Card className="card-admin">
                            <Card.Body>
                                
                                <Card.Text>
                                    <div>
                                        <ul>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to="/newReserve">
                                                    Reservas
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="card-admin">
                            <Card.Body>
                                
                                <Card.Text>
                                    <div>
                                        <ul>
                                            <li className="list-admin">
                                            <Link
                                                    className="btn btn-dark button-admin"
                                                    role="button"
                                                    to={`/listUser/${userId}`}>
                                                    Datos usuario
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </div>
        )
    }

    const MainUnLogged = () => {
        return (
            <div>
                <Header />
                {products.map(product => (

                    <Row xs={1} md={2} className="g-4" key={product._id}>

                        <Col>
                            <Card>
                                <div className="top-50 start-50">
                                    <Card.Img variant="top" src={product.image} className="img-teacher" />
                                </div>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link
                                        className="btn btn-dark button-product"
                                        role="button"
                                        to="/login">
                                        Ver
                                    </Link>
                                    <Link
                                        className="btn btn-dark button-product"
                                        role="button"
                                        to="/login">
                                        Comprar
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                        )
                    </Row>
                ))
                }
                <Link
                    className="btn btn-dark button-product-home"
                    role="button"
                    to="/admin">
                    Volver
                </Link>
                <Footer />
            </div>
        )
    }

    let main = !role ? MainUnLogged() : MainLogged()
    return (
        <div>
            {main}
        </div>
    )

}

export default MainPage;