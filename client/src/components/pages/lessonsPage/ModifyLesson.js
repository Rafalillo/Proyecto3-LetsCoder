import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";

function ModifyLesson() {
    return (
        <div>
            <Header />
            <h1>MODIFICACIÓN DE CLASE</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicLessonName">
                    <Form.Label>Nombre clase</Form.Label>
                    <Form.Control type="text" placeholder="Nombre clase" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLessonDesc">
                    <Form.Label>Descripción clase</Form.Label>
                    <Form.Control type="text" placeholder="Descripción de clase" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLessonTeacher">
                    <Form.Label>profesor</Form.Label>
                    <Form.Control type="text" placeholder="Profesor" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" placeholder="Precio" />
                </Form.Group>
                <Button variant="btn btn-dark button-admin" type="submit">
                    Modificar
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

export default ModifyLesson;