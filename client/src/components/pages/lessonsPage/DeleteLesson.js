import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";

function DeleteLesson() {
    return (
        <div>
            <Header />
            <h1>BORRADO DE CLASE</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicLessontName">
                    <Form.Label>Nombre clase</Form.Label>
                    <Form.Control type="text" placeholder="Selecciona clase" />
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
            <Footer />
        </div>
    )
}

export default DeleteLesson;