import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";

function ModifyTeacher() {
    return (
        <div>
            <Header />
            <h1>MODIFICAR PROFESOR</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicTeacherName">
                    <Form.Label>Nombre profesor</Form.Label>
                    <Form.Control type="text" placeholder="Nombre profesor" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTeacherDesc">
                    <Form.Label>Biografía profesor</Form.Label>
                    <Form.Control type="text" placeholder="Descripción profesor" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTeacherImage">
                    <Form.Label>Imagen profesor</Form.Label>
                    <Form.Control type="file" placeholder="Imagen profesor" />
                </Form.Group>
                <Button variant="btn btn-dark button-admin" type="submit">
                    Subir
                </Button>
                <Link
                    className="btn btn-dark button-product"
                    role="button"
                    to="/admin">
                    Volver
                </Link>
            </Form>
            <Footer />
        </div>
    )
}

export default ModifyTeacher;