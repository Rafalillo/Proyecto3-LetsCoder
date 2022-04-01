import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../../header/HeaderAdmin";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import logged from "../../logged/logged";

function ListProduct() {

    const [products, setProducts] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isAdmin =  (role == 1)? true : false;
    console.log(isAdmin);

    useEffect(() => {
        const getProducts = async() => {
            try {
                const response = await axios.get("http://localhost:5000/api/products", {
                headers: {
                    Authorization: token}
                })
                console.log(response);
                setProducts(response.data.product);
                setProductImage(response.data.product.image);
            } catch (error) {
                
            }
            
        }
        getProducts()
    },[])



    return (
        <div>
            <Header />
            <h1>Listado de productos</h1>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Nombre producto</th>
                            <th>Descripcion</th>
                            <th>Foto</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>

                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td><img className="img-teacher" src={product.url} /></td>
                                <td>{product.price}</td>
                            </tr>
                        ))

                        }


                    </tbody>
                </Table>
            </div>


            <Link
                className="btn btn-dark button-product"
                role="button"
                to="/admin">
                Volver
            </Link>
            <Footer />
        </div>
    )
}

export default ListProduct;