import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";


function ListTeacher() {

    const [teachers, setTeachers] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    let go = "";
    
    if (role == 0) {
        go='/home'
    }else {
        go='/admin'
    }
  
    useEffect(() => {
        const getTeachers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/teacher", {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response);
                setTeachers(response.data.teacher)
                
            } catch (error) {

            }
        }
        getTeachers()
    }, [])
    

    // const DeleteTeacher = async (event) => {
    //     try {
    //         const res = await axios.delete(`http://localhost:5000/api/teacher/${teacherId}`, {
    //             headers: {
    //                 "Authorization": token
    //             }
    //         })
    //         // setSuccessMessage(res.data.msg);
    //     } catch (error) {
    //         // setErrorMessage(error.res.data.msg)
    //     }
    // }

    return (
        
        <div>
            <Header />
            <h1>Listado de profesores</h1>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Nombre profesor</th>
                            <th>Biografia</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher._id}>

                                <td>
                                    <Link to={`/listTeacher/${teacher._id}`}>
                                            {teacher.teacherName}
                                    </Link>
                                </td>
                                <td>{teacher.biography}</td>
                                <td><img className="img-teacher" src={teacher.image} /></td>
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

export default ListTeacher;