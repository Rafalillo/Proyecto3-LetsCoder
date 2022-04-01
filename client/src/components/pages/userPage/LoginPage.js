import { useState } from "react";
import axios from 'axios';
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import {useNavigate} from "react-router";

const Login = () => {

    const [user, setUser ] = useState({
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
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            const response = await axios.post("http://localhost:5000/api/login", user);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userIdMemory", response.data.userId )
            console.log(response);
            const role = localStorage.getItem("role");
            setSuccessMessage(response.data.message);
            
                if (role == 1) {
                    setTimeout(() => {
                        navigate("/admin")
                    })
                    
                } else {
                    setTimeout(() => {
                        navigate("/home")
                })
        }
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
        
    }

    return (
        <div>
            <Header />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text"  name="email" placeholder="Enter email" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  name="password" placeholder="Password"  onChange={handleChange}/>
                </Form.Group>
                <Button variant="dark" type="submit">
                    Enviar
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

export default Login;