import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";

const Producto = () => {
    const { productoId } = useParams();
    const [producto, setProducto] = useState({});
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(`/api/products/${productoId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setProducto(response.data.product);
        }
        getProduct();
    }, [])

    const deleteProduct = async () => {
        try {
            const res = await axios.delete(`/api/products/${productoId}`, {
                headers: {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message);
            setTimeout(() => {
                navigate("/listProduct")
            })
        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }
    console.log(producto);
    const ProductAdmin = () => {
        return (
            <div>
                <Header />
                <div className="flex-card">
                    <Card>
                        <div className="top-50 start-50">
                            <Card.Img variant="top" className="image-info" src={producto.image} />
                        </div>
                        <Card.Body>
                            <Card.Title>{producto.name}</Card.Title>
                            <Card.Text>
                                {producto.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                className="btn btn-dark button-teacher"
                                role="button"
                                to="/listProduct">
                                Volver
                            </Link>
                            <button onClick={handleShow} className="btn btn-dark button-main">
                                Borrar
                            </button>
                        </Card.Footer>
                    </Card>
                </div>
                <div className="message_ok" style={{display: successMessage ? 'block' : 'none'}} role="alert">
                    {successMessage}
                </div>
                <div className="message_error" style={{display: errorMessage ? 'block' : 'none'}} role="alert">
                    {errorMessage}
                </div>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title variant="dark">Borrar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>Si aceptas el producto será borrado permanentemente</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={deleteProduct}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
                <Footer />
            </div>
        )
    }

    const ProductUser = () => {
        return (
            <div>
                <Header />
                <Card>
                    <div className="top-50 start-50">
                        <Card.Img variant="top" className="image-info" src={producto.image} />
                    </div>
                    <Card.Body>
                        <Card.Title>{producto.name}</Card.Title>
                        <Card.Text>
                            {producto.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <button className="btn btn-dark button-main">
                            Comprar
                        </button>
                        <Link
                            className="btn btn-dark button-teacher"
                            role="button"
                            to="/listProduct">
                            Volver
                        </Link>
                    </Card.Footer>
                </Card>
                <div className="message_ok" style={{display: successMessage ? 'block' : 'none'}} role="alert">
                    {successMessage}
                </div>
                <div className="message_error" style={{display: errorMessage ? 'block' : 'none'}} role="alert">
                    {errorMessage}
                </div>
                <Footer />
            </div>
        )
    }
    
    let pro = role == 0 ? ProductUser() : ProductAdmin()
    return (
        <div>
            {pro}
        </div>
    )
}
export default Producto;