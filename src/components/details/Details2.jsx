import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../Helper/Helper'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom';

const Details2 = () => {
    const token = isAuthenticated();
    const  {id}  = useParams()
    const [ details , setDetails ] = useState({})
    const getAllMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/get/transporter/${id}`, {
                headers: { Authorization: `${token}` }
            })
            console.log(response.data);
            setDetails(response.data)
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect((e) => {
        getAllMessages()
    } , [] )
    return (
        <div className="container">
            <div className="details">
                <p>OrderId : - {details.orderId}</p>
                <p>TO : - {details.to}</p>
                <p>From : - {details.from}</p>
                <p>Quantity : - {details.quantity}</p>
                <p>Address : - {details.address}</p>
                <p>Price : - {details.price}</p>
                <p>Status : - Order {details.status}</p>
            </div>
        </div>
    )
}

export default Details2