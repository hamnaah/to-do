import React, { useState, useEffect } from 'react';
import './createTodo.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert'

const CreateTodo = () => {
  const {id} = useParams()

  const [data, setData] = useState({ title: '', description: '' , status:"incomplete"});
  const [todos, setTodos] = useState([]);

  const onInputChange = (name, e) => {
    setData({ ...data, [name]: e.target.value });
  };

  const onButtonClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8800/api/todo/create',
        data,
        { withCredentials: true, headers: { Authorization: localStorage.getItem('token') } }
      );
      console.log('Success creating todo:', response.data);
      setData({ title: '', description: '' }); // Clear form after submission
      getData(); // Refetch todos to display the newly added one
    } catch (err) {
      console.error('Error posting data:', err);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/todo/create', {
        withCredentials: true, headers: { Authorization: localStorage.getItem('token') },
      });
      setTodos(response.data.data);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  const getDataById = async()=>{
    try{
      if(!id){
        console.log("ID is undefined")
        return
      }
      const response = await axios.get(`http://localhost:8800/api/todo/create/${id}`,
      {
      withCredentials:true,
      headers:{Authorization:localStorage.getItem("token")}
      })
      setData(response.data.data)

    }catch(err){
      console.log("error fetching todos")
    }
    
  }

  const editData =async()=>{
    try{
      const updatedData = {
        ...data,
        status:data.status ==="Completed",//convert "completed to true, else false"
      }
      const response = await axios.put(`http://localhost:8800/api/todo/update/${id}`,
      updatedData,
      {
        withCredentials:true,
        headers:{ Authorization:localStorage.getItem("token")}
      })
      swal({
        text:"Todo Updated Successfully!",
        icon:"success",
      })
      getData() // Refetch todos to reflect the update
    }catch(err){
      console.log("error updating Todo",err)
      swal({
        text:"Failed To Update Todo!",
        icon:"error",
      })
    }
  }

  useEffect(() => {
    getData();
    getDataById();
  }, []);

  return (
    <>
      <div className='container'>
        <h4>Create Todo</h4>
        <br />
        <div className="createtodo">
          <h4 id="heading">Create Your Task Here</h4>
          <ul id="firstul">
            <li id="firstli">
              <label for="">Title</label>
              <input
                id="titleid"
                type="text"
                onChange={(e) => {
                  onInputChange("title", e);
                }}
                value={data.title}
              ></input>
            </li>
            <li>
              <label htmlFor="">Status</label>
              <select name="" id="select" onChange={(e) => onInputChange("status",e)}
              value={data.status}>
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
            </li>
          </ul>
          <ul id="scndul">
            <p id="desclabel">Description</p>
            <li>
              <textarea
                name=""
                id="descarea"
                cols="30"
                rows="10"
                onChange={(e) => {
                  onInputChange("description", e);
                }}
                value={data.description}
              ></textarea>
            </li>
          </ul>
          <section id="btnsection">
            <button className="btn">Clear</button>
            <button className="btn" onClick={onButtonClick}>
              Submit
            </button>
            <button className='btn' onClick={() => editData(data.id)}>Edit</button>  
          </section>



          <div className="showtodo">
            <table className="todo-table">
              <thead>
                <tr id="head">
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              
          <div className="todohead">
              <tbody>
                {todos?.map((todo,index) => (
                  <tr id="rows" key={index}>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{todo.status? "Completed":"Incomplete"}</td>
                    {/* Add a button to trigger editData */}
                  </tr>
                ))}
              </tbody>
              </div>
            </table>

          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;

