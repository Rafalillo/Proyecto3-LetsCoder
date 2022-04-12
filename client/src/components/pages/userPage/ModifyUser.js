import React from 'react';
import axios from 'axios';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import { useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const UserModify = () => {
    const {userId} = useParams();
    const token = localStorage.getItem("token");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    let name = "";

    const [user, setInfo] = useState({
        userName:"",
        surname:"",
        age:"",
        password:""
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setInfo({...user, [name]:value})
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/user/${userId}`, {...user},
            {
                headers: {
                    "Authorization": token
                }
            });
            setSuccessMessage(response.data.message);
            name = user.userName;
            
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }console.log(user);
    } 

    return (
        <div>
            <Header />
            <Form className="register_form" onSubmit={formSubmit}>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text register-form-input" name="userName" value={user.userName} placeholder={"Tu nombre"} onChange={onChangeInput} required />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicSurname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="surname" value={user.surname} placeholder="Tu apellido" onChange={onChangeInput} required />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicAge">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" name="age" value={user.age} placeholder="Tu edad" onChange={onChangeInput} required />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" value={user.password} placeholder="Password" onChange={onChangeInput} required />
                </Form.Group>
                <Button className="register-form-button" variant="dark" type="submit">
                    Actualizar
                </Button>
                <Link
                className="btn btn-dark button-product"
                role="button"
                to={`/listUser/${userId}`}>
                Volver
            </Link>
            </Form>
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

export default UserModify;