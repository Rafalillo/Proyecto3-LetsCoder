import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

const Profe = () => {
    const { profesorId } = useParams();
    const [profesor, setprofesor] = useState({});
    const token = localStorage.getItem("token");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getProfesor = async () => {
            const response = await axios.get(`http://localhost:5000/api/teacher/${profesorId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setprofesor(response.data.teacher);
        }
        getProfesor();
    }, [])

    const deleteTeacher = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/teacher/${profesorId}`, {
                headers: {
                    "Authorization": token
                }
            })
            setSuccessMessage(res.data.message);
            setTimeout(() => {
                navigate("/listTeacher")
            })
        } catch (error) {
            setErrorMessage(error.res.data.message)
        }
    }
    console.log(profesor);
    return (
        <div>
            <Header />
            <Card>
                <div className="top-50 start-50">
                    <Card.Img variant="top" className="image-info" src={profesor.image} />
                </div>
                <Card.Body>
                    <Card.Title>
                        
                    </Card.Title>
                    <Card.Text>
                        <p>{profesor.teacherName}</p>
                        <p>{profesor.biography}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {/* <button className="btn btn-dark button-main">
                        Ver clases
                    </button> */}
                    <Link
                        className="btn btn-dark button-teacher"
                        role="button"
                        to="/listteacher">
                        Volver
                    </Link>
                    <button onClick={handleShow} className="btn btn-dark button-main">
                        Borrar
                    </button>
                </Card.Footer>
            </Card>
            <div className="message_ok" style={{display: successMessage ? 'block' : 'none'}} role="alert">
                {successMessage}
            </div>
            <div className="message_error" style={{display: errorMessage ? 'block' : 'none'}} role="alert">
                {errorMessage}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title variant="dark">Borrar Profesor</Modal.Title>
                </Modal.Header>
                <Modal.Body>Si aceptas el profesor será borrado permanentemente</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={deleteTeacher}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    )

}
export default Profe;