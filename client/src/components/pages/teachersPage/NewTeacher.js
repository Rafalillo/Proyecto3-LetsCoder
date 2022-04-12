import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../header/HeaderAdmin";
import { useState } from "react";
import axios from "axios";

function NewTeacher() {

    const [teacher, setTeacher ] = useState({
        teacherName:'',
        biography:''
    });

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isAdmin = true;
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [images, setImages] = useState(false);

    // if (role == 0) {
    //     isAdmin= false
    // }

 

    const handleUpload = async e =>{
        // e.preventDefault()
        // try {
            // if(!isAdmin) return setErrorMessage("No eres administrador! ")
            // const file = e.target.files[0]
            
            // if(!file) return setErrorMessage("File not exist.")

            // if(file.size > 1024 * 1024) // 1mb
            //     return setErrorMessage("Size too large!")

            // if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
            //     return setErrorMessage("El formato del archivo es incorrecto!")

            // let formData = new FormData()
            // formData.append('file', file)
            // console.log(formData);
         
            // const res = await axios.post('http://localhost:5000/api/teacher', formData, {
            //     headers: {
            //         'content-type': 'multipart/form-data',
            //          'Authorization': token
            //         }
            // })
            // console.log(res);
            // setImages({
            //     "imageId": res.data.public_id,
            //     "image": res.data.url
                // data: res.data,
                // url: res.data.teacher.image,
                // id: res.data.teacher.imageId
            // })
            // console.log(res.data);
            // const resphoto = await axios.post('http://localhost:5000/api/teacher'), {
            //     "photoTeacher": {
            //         "public_id": res.data.public_id,
            //         "url": res.data.url
            //     }
            // }) 
            // console.log(resphoto);
            // setImages(resphoto.data)
    //         const response = await axios.post('http://localhost:5000/api/teacher', { ...setTeacher }, {
    //             headers: { "Authorization": token }
    //         })
    //         console.log(response);
    //         setSuccessMessage("Profesor creado correctamente");


    //     } catch (err) {
    //         console.log(err);
    //         setErrorMessage(err.response.data.msg)
    //     }
    }

    const handleChange = (event) => {
 
        const { name, value} = event.target
        setTeacher({...teacher, [name]: value})
        console.log(teacher);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.post('/api/teacher', {...teacher}, {
                headers: {"Authorization": token}
            })
            console.log(response);
            setSuccessMessage("Profesor añadido correctamente");
            
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.message)
        }


    }

    
    return (
        <div>
            <Header />
            <h1>ALTA DE NUEVO PROFESOR</h1>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTeacherName">
                    <Form.Label>Nombre profesor</Form.Label>
                    <Form.Control className="input" type="text" name="teacherName" value={teacher.teacherName} placeholder="Nombre profesor" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTeacherDesc">
                    <Form.Label>Biografía profesor</Form.Label>
                    <Form.Control className="input" type="text" name="biography" value={teacher.biography} placeholder="Biografia profesor" onChange={handleChange} />
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
export default NewTeacher;