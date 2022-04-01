import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";

function ModifyProduct() {
    return (
        <div>
            <Header />
            <h1>MODIFICACIÓN DE PRODUCTO</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicProductName">
                    <Form.Label>Nombre producto</Form.Label>
                    <Form.Control type="text" placeholder="Nombre producto" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProductDesc">
                    <Form.Label>Descripción producto</Form.Label>
                    <Form.Control type="text" placeholder="Descripción producto" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" placeholder="Precio" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProductImage">
                    <Form.Label>Imagen producto</Form.Label>
                    <Form.Control type="file" placeholder="Imagen producto" />
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

export default ModifyProduct;