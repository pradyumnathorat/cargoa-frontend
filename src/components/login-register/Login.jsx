import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [ flagged, setFlag] = useState("manufacture");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/login/${flagged}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                alert(data.message);
                navigate(`/${flagged}`)
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    return (
        <>
            <div className="main">
                <div className="login">
                <div className="buttons d-flex justify-content-around mb-2">
                        <button className={ flagged == 'manufacture' ? "btn btn-dark" : "btn btn-light"} onClick={(e) => setFlag('manufacture')} >Manufacture</button>
                        <button className={ flagged == 'transporter' ? "btn btn-dark" : "btn btn-light"} onClick={(e) => setFlag('transporter')} >Transporter</button>
                    </div>
                    <h2 className='text-center'>Login as { flagged == 'transporter' ? "Transporter" : "Manufacturer" }</h2>
                    <form onSubmit={handleSubmit} className="needs-validated">
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input className="form-control" type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <div className="invalid-feedback">Please enter your email</div>
                        </div>
                        <div className="form-group was-validated">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" type="text" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            <div className="invalid-feedback">Please enter your Password</div>
                        </div>
                        <input className="btn btn-success w-100" type="submit" value="Login" />
                        <button onClick={() => navigate("/register")} className="btn btn-primary w-100 mt-3">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login