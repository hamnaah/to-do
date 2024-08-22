import './SignUp.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const SignUp=()=>{
const navigate = useNavigate()
const [data,setData] = useState({name:"",password:"",email:"",mobile:"",image:null,})

const onInputChange = (name,e)=>{
    setData({...data,[name]:e.target.value})
}

const onImageChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  }

console.log(data)

const onButtonClick= async()=>{
    try{
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("password", data.password);
        formdata.append("email", data.email);
        formdata.append("mobile", data.mobile);
        formdata.append("image", data.image);
        console.log("hsi", formdata);
        const response = await axios.post('http://localhost:8800/api/user/create',formdata,
        { headers: { "Content-Type": "multipart/form-data" } })
        console.log("Successfully Registered",(response.data))
        Swal.fire({
            title: "Success!",
            text: "Your account has been created!",
            icon: "success"
          });
        navigate("/login")

        //reset input fields after successful post
        setData({
            name:"",
            password:"",
            email:"",
            mobile:"",
            image:null,
        })

    }catch(err){
        console.log("SignUp Failed, Error posting data", err)
        Swal.fire({
            title: "Error!",
            text: "Failed to create account! ",
            icon: "error"
          });
    }

}

    return(
    <>
    <div className='signup'>
        <div className='signup-box'>
            <div className='inp1'>
               <label>UserName:</label> 
            <input type="text" className='input' placeholder='Enter User Name' onChange={(e)=>{onInputChange("name",e)}} value={data.name} />
            </div>

            <div className='inp1'>
            <label> Password:</label> 
            <input type="password" className='input' placeholder='Enter Password' onChange={(e)=>{onInputChange("password",e)}} value={data.password} />
            </div>

            <div className='inp1'>
            <label>Email:</label> 
            <input type="text" className='input' placeholder='eg: abc@gmail.com' onChange={(e)=>{onInputChange("email",e)}} value={data.email} />
            </div>

            <div className='inp1'>
            <label>Mobile:</label> 
            <input type="text" className='input' onChange={(e)=>{onInputChange("mobile",e)}} value={data.mobile} />
            </div>

            <label htmlFor="">Image</label>
          <input
            type="file"
            onChange={(e) => {
              onImageChange(e);
            }}
          />

            <div className='buttons'>
                <button className='btn' onClick={onButtonClick}>Sign Up</button>
                <button className='btn' onClick={()=>{navigate('/login')}}>Login</button>
            </div>
        </div>
        
        </div></>
    )
}


export default SignUp