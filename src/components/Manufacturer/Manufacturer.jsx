import React, { useEffect, useState } from 'react'
import "./manu.css";
import axios from "axios";
import { isAuthenticated } from '../../Helper/Helper'
const Manufacturer = () => {
    const [Transporters, setTransporters] = useState(null);
    const token = isAuthenticated();
    console.log(token);
    const [orderID, setOrderID] = useState("");
    const [data, setData] = useState({ to: "", from: "", quantity: "", address: "", transporter: "" });
    console.log(data);
    const getTransportes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/get/transporter`, {
                headers: { Authorization: `${token}` }
            })
            console.log(response.data);
            setTransporters(response.data);
        } catch (err) {
            alert(err.message)
        }
    }
    const getOneManufacturer = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/get/manufacturer`, {
                headers: { Authorization: `${token}` }
            })
            console.log(response.data);
            setData({ ...data, address: response.data.address })
        } catch (err) {
            alert(err.message)
        }
    }

    function generateOrderID() {
        const randomString = Math.random().toString(36).substring(2, 8);
        const timestamp = Date.now();
        return `${randomString}-${timestamp}`;
    }

    useEffect(() => {
        getTransportes()
        getOneManufacturer()
        setOrderID(generateOrderID())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/post/manufacturer` , {
                method: "POST",
                headers: { "Content-Type": "application/json"  ,  Authorization: `${token}`},
                body: JSON.stringify({...data , orderId : orderID})
            })
            const msg  = await response.json();
            console.log(msg);
        } catch (err) {
            alert(err.message)
        }
    }
    return (
        <div className="container">
            <div className="manu">
                <form onSubmit={handleSubmit} className="needs-validated">
                    <div className="form-group">
                        <label className="form-label" htmlFor="OrderID">orderID:-</label>
                        <div id="orderID" >{orderID}</div>
                    </div>
                    <div className="form-group was-validated gap">
                        <label className="form-label" htmlFor="to">To</label>
                        <input className="form-control" type="text" id="to" onChange={(e) => setData({ ...data, to: e.target.value })} value={data.to} required />
                    </div>
                    <div className="form-group was-validated gap">
                        <label className="form-label" htmlFor="from">From</label>
                        <input className="form-control" type="text" id="from" onChange={(e) => setData({ ...data, from: e.target.value })} value={data.from} required />
                    </div>
                    <select className="form-select gap" aria-label="Default select example" onChange={(e) => setData({ ...data, quantity: e.target.value })} value={data.quantity}>
                        <option selected>Quantity</option>
                        <option value="1 Ton">1 Ton</option>
                        <option value="2 Ton">2 Ton</option>
                        <option value="3 Ton">3 Ton</option>
                    </select>
                    <div className="form-group was-validated gap">
                        <label className="form-label" htmlFor="Address">Address</label>
                        <input className="form-control" type="text" id="Address" onChange={(e) => setData({ ...data, address: e.target.value })} value={data.address} required />
                    </div>
                    <select className="form-select gap" aria-label="Default select example" onChange={(e) => setData({ ...data, transporter: e.target.value })} value={data.transporter}>
                        <option selected>Transporter</option>
                        {
                            Transporters && Transporters.map(ele => (
                                <option value={ele._id} >{ele.name}</option>
                            ))
                        }
                    </select>
                    <input className="btn btn-success w-100 mt-3" type="submit" value="Push" />
                </form>
            </div>
        </div>
    )
}

export default Manufacturer