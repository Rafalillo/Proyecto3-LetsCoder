import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";


function ListProduct() {

    const [products, setProducts] = useState([]);
    const [productImage, setProductImage] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    let go = "";

    useEffect(() => {
        const getProducts = async() => {
            try {
                const response = await axios.get("/api/products", {
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
console.log(products);

    
    if (role == 0) {
        go='/home'
    }else {
        go='/admin'
    }

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

                                <td>
                                    <Link to={`/listProduct/${product._id}`}>{product.name}
                                    </Link>
                                </td>
                                <td>{product.description}</td>
                                <td><img className="img-teacher" src={product.image} /></td>
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
                to={ go }>
                Volver
            </Link>
            <Footer />
        </div>
    )
}

export default ListProduct;