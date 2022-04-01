import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link, useParams } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";
import { useState } from "react";
import axios from "axios";


function DeleteTeacher() {

    const {teacherId} = useParams();
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isAdmin = true;
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [images, setImages] = useState(false);

    if (role == 0) {
        isAdmin= false
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.delete('http://localhost:5000/api/teacher/:{id}', {
                headers: {"Authorization": token}
            })
            console.log(response);
            setSuccessMessage("Profesor borrado correctamente");
            
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.message)
        }


    }

    return (
        <div>
            <Header />
            <h1>BORRAR PROFESOR</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTeacherName">
                    <Form.Label>Nombre profesor</Form.Label>
                    <Form.Control type="text" name="teacherNameid" placeholder="Nombre profesor" />
                </Form.Group>
                
                <Button variant="btn btn-dark button-admin" type="submit">
                    Borrar
                </Button>
                <Link
                    className="btn btn-dark button-product"
                    role="button"
                    to="/admin">
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

export default DeleteTeacher;