import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../Helper/Helper'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom';

const Details = () => {
    const token = isAuthenticated();
    const  {id}  = useParams()
   const [ price , setPrice ] = useState(0)
    const [ details , setDetails ] = useState({})
    const getAllMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/get/manufacturer/${id}`, {
                headers: { Authorization: `${token}` }
            })
            console.log(response.data);
            setDetails(response.data)
        } catch (err) {
            alert(err.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/post/transporter` , {
                method: "POST",
                headers: { "Content-Type": "application/json"  ,  Authorization: `${token}`},
                body: JSON.stringify({...details , price : price})
            })
            const msg  = await response.json();
            alert(msg.message)
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
                <div>Price :-</div>
                <input type="Number" onChange={(e) => setPrice(e.target.value)} value={price} required/><br /><br />
                <button className="btn btn-success" onClick={handleSubmit} >Confirm</button>
            </div>
        </div>
    )
}

export default Details