import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Header from "../../header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

function NewReserve() {

    const [reserveInfo, setReserve] = useState({
        lessonNameId: ''
    })
    const [lessons, setLesson] = useState([]);
    const token = localStorage.getItem("token");

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (event) => {
 
        const { name, value} = event.target
        setReserve({...reserveInfo, [name]: value})
        console.log(reserveInfo);
    };

    useEffect(()=> {
        const getLessons = async () => {
            const res = await axios.get('http://localhost:5000/api/lesson', {
                headers: {"Authorization": token}
            })
            console.log(res);
            setLesson(res.data.lesson)
        }
        getLessons();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response =  await axios.post('http://localhost:5000/api/reserve', {...reserveInfo}, {
                headers: {"Authorization": token}
            })
            console.log(response);
            setSuccessMessage("Reserva creada correctamente");
            
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.message)
        }


    }

    return (
        <div>
            <Header />
            <h1>REGISTRO DE NUEVA RESERVA</h1>
            <Form onSubmit={handleSubmit}>
                {/* <Form.Group className="mb-3" controlId="formBasicReserveLesson">
                    <Form.Label>Nombre de la clase</Form.Label>
                    <Form.Control type="text" name="lessonNameId" placeholder="Nombre de clase" value={reserveInfo.lessonName} onChange={handleChange} />
                </Form.Group> */}
                <select name="lessonNameId" onChange={handleChange}>
                    {
                        lessons.map(lesson => {
                            return(
                                <option key={lesson._id}  value={lesson._id} >{lesson.lessonName}</option>

                            )
                        })
                    }

                </select> 
                
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

export default NewReserve;