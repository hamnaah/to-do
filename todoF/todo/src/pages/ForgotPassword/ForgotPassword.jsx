import React from 'react'
import swal from 'sweetalert'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './forgotPassword.css'

const ForgotPassword = ()=>{
    const [load,setLoad] = useState(false)
    const navigate = useNavigate()
    const [data,setData]= useState({ email:""})
    const onInputChange = (name,e)=>{
        setData({...data, [name]:e.target.value})
    }
}

const onButtonClick = async()=>{
    try{
        setLoad(true)
        const response = await axios.post("http://localhost:8800/api/user/forgotPassword",
        data)
        console.log("reset mail send successfully")
        setTimeout(()=>{
            setLoad(false)
            swal({
                text: "Mail Sent Successfully",
                icon: "success",
            })
            navigate("/login")
        },4000)
    }catch(err){
        console.log("error sending mail")
    }
}

return(
    <div className="forgot-sec">
        <div>
            <h3>Forgot Password?</h3>
        </div>
        <label for="">Email</label>
              <input
                id="email"
                type="text"
                onChange={(e) => {
                  onInputChange("email", e);
                }}
              ></input>
              <button className='forgot-btn' onClick={onButtonClick}>
                {load ? "Loading..." : "SUBMIT"}
              </button>
    </div>
)