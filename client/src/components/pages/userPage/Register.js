import { useState } from "react";
import axios from 'axios';
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router";

const Register = () => {

    const [user, setUser ] = useState({
        username:'',
        surname:'',
        age:'',
        email:'',
        password:''
    })

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

        
    const handleChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    };  
    console.log(user);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", user);
            localStorage.setItem('token', response.data.accessToken);
            setSuccessMessage("Usuario registrado correctamente");
            setTimeout(() => {
                navigate("/login")
            }, 3000)
            console.log(response);
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
        
    }
  

    return (
        <div>
            <Header />
            <Form className="register_form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text register-form-input" name="userName" value={user.name} placeholder="Tu nombre" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicSurname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="surname" value={user.surname} placeholder="Tu apellido" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicAge">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" name="age" value={user.age} placeholder="Tu edad" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} placeholder="Enter email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        No compartiremos tus datos con nadie.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 register-form-input" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3 register-form-input" controlId="formBasicConfirmPassword">
                    <Form.Label>Repite contraseña</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={user.password} placeholder="Confirma tu contraseña" onChange={handleChange} />
                </Form.Group>
                <Button className="register-form-button" variant="dark" type="submit">
                    Submit
                </Button>
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

export default Register;