import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/Dropdown";
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
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userIdMemory")
    let go = "";
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (event) => {

        const { name, value } = event.target
        setReserve({ ...reserveInfo, [name]: value })
        console.log(reserveInfo);
    };

    if (role == 0) {
        go = '/'
    } else {
        go = '/admin'
    }

    useEffect(() => {
        const getLessons = async () => {
            const res = await axios.get('/api/lesson', {
                headers: { "Authorization": token }
            })
            console.log(res);
            setLesson(res.data.lesson)
        }
        getLessons();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post('/api/reserve', { ...reserveInfo }, {
                headers: { "Authorization": token }
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

            <Form onSubmit={handleSubmit} >
                <Form.Select name="lessonNameId" onChange={handleChange} className="reserve-form">
                    {
                        lessons.map(lesson => {
                            return (
                                <option key={lesson._id} value={lesson._id} >{lesson.lessonName}</option>

                            )
                        })
                    }

                </Form.Select>
                <br />
                <Button variant="btn btn-dark button-admin" type="submit">
                    Apuntarse
                </Button>
                <Link
                    className="btn btn-dark button-product"
                    role="button"
                    to={go}>
                    Volver
                </Link>
                {/* <Link
                    className="btn btn-dark button-product"
                    role="button"
                    to={`/reserveInfo/${userId}`}>
                    Mis reservas
                </Link> */}
            </Form>
            <div className="message_ok" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
                {successMessage}
            </div>
            <div className="message_error" style={{ display: errorMessage ? 'block' : 'none' }} role="alert">
                {errorMessage}
            </div>
            <Footer />
        </div>
    )


}

export default NewReserve;