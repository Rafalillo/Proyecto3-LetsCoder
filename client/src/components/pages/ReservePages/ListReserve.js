import Table from 'react-bootstrap/Table';
import Footer from "../../footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../header/Header";
import { useEffect, useState } from "react";


function ListReserve() {

    const [reserves, setReserve] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    let go = "";
    

    useEffect(() => {
        const getReserve = async () => {
            try {
                const response = await axios.get("/api/reserve", {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log(response);
                setReserve(response.data.reserve);

            } catch (error) {

            }
            console.log(reserves);
        }
        getReserve()
    }, [])

    return (
        <div>
            <Header />
            <h1>Listado de reservas por usuario</h1>
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>

                            <th>Clase</th>
                            <th>Usuario</th>
                            
                        </tr>
                    </thead>
                    <tbody striped bordered hover variant="dark">
                        {reserves.map(reserve => {
                            return (

                                <tr key={reserve._id}>
                                    
                                    <td>{reserve.userName.userName}</td>

                                    <td>{reserve.lessonName.lessonName}</td>

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
                to="/home">
                Volver
            </Link>
            <Footer />
        </div>

    )
}

export default ListReserve;