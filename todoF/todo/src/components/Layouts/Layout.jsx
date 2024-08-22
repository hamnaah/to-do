import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./layout.css";
import axios from "axios";
import { useState,useEffect } from 'react'

const Layout = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});


  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/user/create",
        {
          withCredentials: true,
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      setProfile(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  },[]);

  console.log("hai",profile)



  const onLogoutClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/logout",
        {},
        {
          withCredentials: true,
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout Failed", response.data);
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


0
  return (
    <>
      <div className="wrapper">
        <div className="navbar">
          <NavLink className="nav" to="/">
            Home
          </NavLink>
          <NavLink className="nav" to="/createtodo">
            Create Todo
          </NavLink>
          <NavLink className="nav" to="/mytodos">
            My Todos
          </NavLink>
          <NavLink className="nav" to="/settings">
            Settings
          </NavLink>
          <NavLink className='nav' to='/profile'>Profile</NavLink>
          </div>

          <div className="navbar-right">
            <div className="profile">
              {" "}
              <img
                src={`http://localhost:8800/images/${profile.image}`}
                alt="profile"
                crossOrigin="anonymous"
              />
            </div>
          

  
            <button className="logout-btn" onClick={onLogoutClick}>
              {" "}
              Logout
            </button>
         
        </div>

        <div className="wrap">
          <div className="sidebar"></div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
