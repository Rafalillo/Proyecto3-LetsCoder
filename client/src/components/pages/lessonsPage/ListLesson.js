import Table from 'react-bootstrap/Table';
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../header/Header";
import { useEffect, useState } from "react";


function ListLessons() {

    const [lessons, setLesson] = useState([]);
    const [teacher, setTeacher] = useState({});
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    let go = "";

    if (role == 0) {
        go='/home'
    }else {
        go='/admin'
    }

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
            <h1>Listado de clases</h1>
            <div>
            
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Nombre clase</th>
                            
                            <th>Descripcion</th>
                            <th>Alumnos</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {lessons.map(lesson => {
                            return (
                            
                            <tr key={lesson._id}>
                            
                                <td>{lesson.lessonName}</td>
                                <td>{lesson.teacherName.teacherName}</td>
                                <td>{lesson.description}</td>
                                <td>{lesson.pupils.length}</td>
                                <td>{lesson.price}</td>
                            </tr>
                        )})

                        } */}
                        {lessons.map(lesson => (
                            <tr key={lesson._id}>

                                <td>
                                    <Link to={`/newReserve`}>{lesson.lessonName}
                                    </Link>
                                </td>
                                <td>{lesson.description}</td>
                                <td>{lesson.pupils.length}</td>
                                <td>{lesson.price}</td>
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

export default ListLessons;