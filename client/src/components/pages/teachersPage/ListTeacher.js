import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderAdmin from "../../header/HeaderAdmin";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";


function ListTeacher() {

    const [teachers, setTeachers] = useState([]);
    const token = localStorage.getItem("token");

    const DeleteTeacher = async (event) => {
        event.preventDefault();
        try {
            const response =  await axios.delete('http://localhost:5000/api/teacher/:{id}', {
                headers: {"Authorization": token}
            })
            console.log(response);
            // setSuccessMessage("Profesor borrado correctamente");
            
        } catch (err) {
            console.log(err);
            // setErrorMessage(err.response.data.message)
        }
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

    return (
        
        <div>
            <Header />
            <h1>Listado de profesores</h1>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Nombre</th>
                            <th>Biografia</th>
                            <th>Foto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher._id}>

                                <td>{teacher.teacherName}</td>
                                <td>{teacher.biography}</td>
                                <td><img className="img-teacher" src={teacher.image} /></td>
                                <td><input type="button" value="Borrar" className="btn-dark" onClick={DeleteTeacher} /></td>
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

export default ListTeacher;