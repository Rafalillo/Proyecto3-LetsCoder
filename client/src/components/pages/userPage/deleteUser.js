import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";

function DeleteUser() {
    return (
        <div>
            <Header />
            <h1>BORRAR USUARIO</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>Nombre usuario</Form.Label>
                    <Form.Control type="text" placeholder="Nombre usuario" />
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

export default DeleteUser;