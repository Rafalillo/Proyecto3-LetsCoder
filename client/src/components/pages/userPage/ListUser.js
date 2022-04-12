import Table from 'react-bootstrap/Table';
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../header/Header";
import { useEffect, useState } from "react";

function ListUser() {

    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get("/api/user", {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(response);
                setUsers(response.data.users)
            } catch (error) {

            }

        }
        getUsers()
    }, [])


    return (
        <div>
            <Header />
            <h1>Listado de usuarios</h1>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody striped bordered hover variant="dark">
                        {users.map(user => {
                            return (

                                <tr key={user._id}>
                                    <td>
                                        <Link to={`/listUser/${user._id}`}>
                                            {user.userName}
                                        </Link>
                                    </td>
                                    <td>{user.surname}</td>

                                    <td>{user.email}</td>

                                </tr>
                            )
                        })

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

export default ListUser;