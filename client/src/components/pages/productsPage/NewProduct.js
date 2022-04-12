import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Header from "../../header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

function NewProduct() {

    const [productInfo, setProduct ] = useState({
        name:'',
        description:'',
        image:'',
        price:0
    });

    const token = localStorage.getItem("token");
    // const role = localStorage.getItem("role");
    // const isAdmin = true;
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [images, setImages] = useState(false);

    // if (role == 0) {
    //     isAdmin= false
    // }

    const handleChange = (event) => {
 
        const { name, value} = event.target
        setProduct({...productInfo, [name]: value})
        console.log(productInfo);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.post('/api/products', {...productInfo, images}, {
                headers: {"Authorization": token}
            })
            console.log(response);
            setSuccessMessage("Producto añadido correctamente");
            
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.message)
        }


    }

    const handleUpload = async (e) =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            
            if(!file) return setErrorMessage("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return setErrorMessage("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return setErrorMessage("El formato del archivo es incorrecto!")

            let formData = new FormData()
            formData.append('file', file)
            console.log(formData);
         
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
        
            setImages(res.data)

        } catch (err) {
            setErrorMessage(err.response.data.msg)
        }
    }

    return (
        <div>
            <Header />
            <h1>ALTA DE NUEVO PRODUCTO</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicProductName">
                    <Form.Label>Nombre producto</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Nombre producto" value={productInfo.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProductDesc">
                    <Form.Label>Descripción producto</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Descripción producto" value={productInfo.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" placeholder="Precio" value={productInfo.price} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProductImage">
                    <Form.Label>Imagen producto</Form.Label>
                    <Form.Control type="file" name="image" placeholder="Imagen producto" onChange={handleUpload} />
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

export default NewProduct;