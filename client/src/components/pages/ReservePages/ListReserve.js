import Table from 'react-bootstrap/Table';
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../header/Header";
import { useEffect, useState } from "react";


function ListReserve() {

    const [reserve, setReserve] = useState([]);
    const [teacher, setTeacher] = useState({});
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getLessons = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/lesson", {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(response);
                setLesson(response.data.lesson);
                setTeacher(response.data.lesson.teacherName)
                
                
            } catch (error) {

            }

        }
        getLessons()
    }, [])

 


    return (
        <div>
            <Header />
            <h1>Listado de usuarios</h1>
            <div>
            {
                lessons.map(lesson => {
                    return (
                        <div key={lesson._id}>
                        <p>{lesson.lessonName}</p>
                        <p>{lesson.teacherName.teacherName}</p>
                        </div>
                    )
                })
            }
            {/* {
                teacher.map(profe => {
                    return (
                        <div key={profe._id}>
                            <p>{profe.teacherName}</p>
                        </div>
                    )
                })
            } */}
                {/* <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Nombre clase</th>
                            <th>Apellido</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map(lesson => {
                            return (
                            
                            <tr>
                            <Link key={lesson._id} to={`/lesson/${lesson._id}`}>
                                <td>{lesson.lessonName}</td>
                                </Link>

                                <td>{lesson.surname}</td>

                                <td>{lesson.email}</td>

                            </tr>
                        )})

                        }


                    </tbody>
                </Table> */}
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

export default ListReserve;