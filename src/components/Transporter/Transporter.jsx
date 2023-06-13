import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./home.css"
import { isAuthenticated } from '../../Helper/Helper'
import axios from "axios";
const Transporter = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(null);
  const token = isAuthenticated()
  const getAllMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/get/manufacturer/msg`, {
        headers: { Authorization: `${token}` }
      })
      console.log(response.data);
      setMessages(response.data)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getAllMessages()
  }, [])
  return (
    <>
      <div className="manufature">
        <div className="msg">
          <div class="input-group rounded">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <div>All Messages :-</div>
          <div>
            {
              messages && messages.map(ele => (
                <div className="msgLi" onClick={ (e) => navigate(`/details/${ele._id}`)}>
                  OrderId :- {ele.orderId}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Transporter