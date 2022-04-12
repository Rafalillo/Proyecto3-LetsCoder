import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

const Reservas = () => {
    const userId = localStorage.getItem("userIdMemory")
    
    const [reserves, setReserve] = useState({});
    const [user, setUser] = useState({});
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    let go = "";
    let reserveUserId = "";
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reserve`, {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(response);
                setReserve(response.data.reserve);
                
                
                // reserveUserId = response.data.userName.userName._id; 
            } catch (error) {

            }
            
            console.log(reserves);
             //console.log(user);
        }
        getLessons()

        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user`, {
                    headers: {
                        "Authorization": token
                    }
                })
                setUser(res.data.users);
                //setUser({...user, userName:res.data.users.userName})
                console.log(res.data.users);
                reserveUserId = user.age;
                
            } catch (error) {

            }
            
            
             
        }
        getUser()

    }, [])
    console.log(user);
    
    console.log(reserveUserId);
    if (role == 0) {
        go='/home'
    }else {
        go='/admin'
    }

    // user.map(us => {
    //     <div key={us._id}>
    //         { key = userId  }
    //     </div>
        
        
    // })

    return (
        <div>
            <Header />
            <Card>
                <div className="top-50 start-50">
                   
                </div>
                <Card.Body>
                    <Card.Title>
                        {
                       
                   }
                    </Card.Title>
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
                    {/* <Link
                        className="btn btn-dark button-teacher"
                        role="button"
                        to={`/modifyUser/${usuarioId}`}>
                        Modificar
                    </Link> */}
                

                </Card.Footer>
            </Card>
            <div className="message_ok" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
                {successMessage}
            </div>
            <div className="message_error" style={{ display: errorMessage ? 'block' : 'none' }} role="alert">
                {errorMessage}
            </div>

           
            {/* <Modal show={show} onHide={handleClose}>
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
            </Modal> */}

            <Footer />
        </div>
    )

}
export default Reservas;