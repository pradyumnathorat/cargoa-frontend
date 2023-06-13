import React, { useState } from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [flagged, setFlag] = useState("manufacture");
    const navigate = useNavigate();
    const ValdateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const ValidatePassword = (password) => {
        let error = '';

        if (!password) {
            error = 'Password is required';
        } else if (password.length < 8) {
            error = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(password)) {
            error = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            error = 'Password must contain at least one lowercase letter';
        } else if (!/\d/.test(password)) {
            error = 'Password must contain at least one number';
        }
        return error;
    }
    const Register = async () => {
        try {
            const response = await fetch(`http://localhost:8080/register/${flagged}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    address: address,
                    password: password
                })
            })
            const data = await response.json();
            console.log(data);
            alert(data.message)
        } catch (err) {
            alert(err.message)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmail = ValdateEmail(email)
        const isPassword = ValidatePassword(password)
        if (isEmail) {
            if (isPassword != "") {
                alert(isPassword)
            } else if (password != password2) {
                alert("Password and Repeat Password Not Matching")
            } else {
                Register()
                navigate("/")
            }
        } else {
            alert("Please enter valid Email")
        }
    }

    return (
        <>
            <div className="main">

                <div className="login">
                    <div className="buttons d-flex justify-content-around mb-2">
                        <button className={flagged == 'manufacture' ? "btn btn-dark" : "btn btn-light"} onClick={(e) => setFlag("manufacture")} >Manufacture</button>
                        <button className={flagged == 'transporter' ? "btn btn-dark" : "btn btn-light"} onClick={(e) => setFlag("transporter")} >Transporter</button>
                    </div>
                    <h2 className='text-center'>SignUp as {flagged == "transporter" ? "Transporter" : "Manufacturer"} </h2>
                    <form onSubmit={handleSubmit} className="needs-validated">
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input className="form-control" type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} required />
                            <div className="invalid-feedback">Please enter your Name</div>
                        </div>
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input className="form-control" type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <div className="invalid-feedback">Please enter your email</div>
                        </div>
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="Address">Address</label>
                            <input className="form-control" type="text" id="Address" onChange={(e) => setAddress(e.target.value)} value={address} required />
                            <div className="invalid-feedback">Please enter your Address</div>
                        </div>
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" type="text" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            <div className="invalid-feedback">Please enter your Password</div>
                        </div>
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="password">Confirm Password</label>
                            <input className="form-control" type="text" id="password" onChange={(e) => setPassword2(e.target.value)} value={password2} required />
                            <div className="invalid-feedback">Please enter confirm password</div>
                        </div>
                        <input className="btn btn-success w-100" type="submit" value="SignUp" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register