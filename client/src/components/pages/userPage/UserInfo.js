import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import mandala from "../userPage/image/mandala.jpg";

const Usuario = () => {
    const { usuarioId } = useParams();
    const [usuario, setUsuario] = useState({});
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    let go = "";
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`/api/user/${usuarioId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setUsuario(response.data.users);
        }
        getUser();
    }, [])

    if (role == 0) {
        go='/'
    }else {
        go='/admin'
    }

    const deleteUser = async () => {
        try {
            const res = await axios.delete(`/api/user/${usuarioId}`, {
                headers: {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message);
            setTimeout(() => {
                navigate("/listUser")
            })
        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }


    return (
        <div>
            <Header />
            <Card>
                <div className="top-50 start-50">
                    <img variant="top" className="image-info" src={mandala}></img>
                </div>
                <Card.Body>
                    <Card.Title>
                        <p>{usuario.userName} {usuario.surname} {usuario.age} años</p>
                        <p>{usuario.email}</p></Card.Title>
                    <Card.Text>

                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <button onClick={handleShow} className="btn btn-dark button-main">
                        Borrar
                    </button>
                    <Link
                        className="btn btn-dark button-teacher"
                        role="button"
                        to= { go }>
                        Volver
                    </Link>
                    <Link
                        className="btn btn-dark button-teacher"
                        role="button"
                        to={`/modifyUser/${usuarioId}`}>
                        Modificar
                    </Link>
                

                </Card.Footer>
            </Card>
            <div className="message_ok" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
                {successMessage}
            </div>
            <div className="message_error" style={{ display: errorMessage ? 'block' : 'none' }} role="alert">
                {errorMessage}
            </div>

           
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title variant="dark">Borrar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>Si aceptas el usuario será borrado permanentemente</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={deleteUser}>
                        Aceptar
                    </Button>
                    </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    )

}
export default Usuario;