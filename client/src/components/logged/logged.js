import axios from "axios";
import { useState, useEffect } from "react";

function Logged() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [admin, setAdmin] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const response = await axios.get("/user", {
                        headers: { Authorization: token }
                    })
                    setLogged(true)
                    if (response.data.role == 1) {
                        setAdmin(true)
                    }
                } catch (err) {
                    console.log(err);
                }
                getUser();
            }
        }

    })
}

export default Logged;



