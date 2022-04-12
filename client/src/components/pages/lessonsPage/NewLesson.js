import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router";
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';

function NewLesson() {

    const [lessonInfo, setLesson] = useState({
        lessonName: '',
        description: '',
        teacherNameid: '',
        time: '',
        price: 0
    })

    const [teachers, setTeachers] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isAdmin = true;
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    // navigate = useNavigate();

    useEffect(() => {
        const getTeachers = async () => {
            try {
                const res = await axios.get("/api/teacher", {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(res);
                setTeachers(res.data.teacher)
            } catch (error) {

            }

        }
        getTeachers()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLesson({ ...lessonInfo, [name]: value });
        console.log(lessonInfo);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/newLesson', { ...lessonInfo }, {
                headers: { "Authorization": token }
            })
            console.log(response);
            setSuccessMessage("Nueva clase añadida");
            // setTimeout(() => {
            //     navigate("/login")
            // }, 3000)

        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    return (
        <div>
            <Header />
            <h1>ALTA DE NUEVA CLASE</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicLessonName">
                    <Form.Label>Nombre clase</Form.Label>
                    <Form.Control type="text" name="lessonName" placeholder="Nombre clase" value={lessonInfo.lessonName} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLessonDesc">
                    <Form.Label>Descripción clase</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Descripción de clase" value={lessonInfo.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLessonTeacher">
                    <Form.Label>profesor</Form.Label>
                    {/* <Form.Control type="select" name="teacherNameid" placeholder="Profesor" value={lessonInfo.teacherName} onChange={handleChange} /> */}
                    {/* <InputGroup className="mb-3 dark">
                        <SplitButton
                            variant="outline-secondary"
                            title="Elige un profesor"
                            id="segmented-button-dropdown-1">
                            <Dropdown.Item href="#">Action</Dropdown.Item>
                            <Dropdown.Item href="#">Another action</Dropdown.Item>
                            <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        </SplitButton>
                    </InputGroup> */}
                    <Form.Select name="teacherNameid" onChange={handleChange} aria-label="Default select example">
                    
                        {
                            teachers.map(teacher=> {
                                return(
                                    <option key={teacher._id} value={teacher._id}>{teacher.teacherName}</option>
                                )
                            })
                        }
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTime">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control type="time" name="time" placeholder="Cuando" value={lessonInfo.time} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="price" placeholder="Precio" value={lessonInfo.price} onChange={handleChange} />
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
                <div className="message_ok" style={{ display: successMessage ? 'block' : 'none' }} role="alert">
                    {successMessage}
                </div>
                <div className="message_error" style={{ display: errorMessage ? 'block' : 'none' }} role="alert">
                    {errorMessage}
                </div>
            </Form>
            <Footer />
        </div>
    )
}

export default NewLesson;