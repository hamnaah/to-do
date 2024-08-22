import './settings.css'
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import swal from 'sweetalert';

const Settings =()=>{
    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
        try {
          const response = await axios.get('http://localhost:8800/api/todo/create', {
            withCredentials: true, headers: { Authorization: localStorage.getItem('token') },
          });
          setTodos(response.data.data);
        } catch (e) {
          console.error('Error fetching data:', e);
        }
      };
    
      useEffect(() => {
        getTodos();
      }, []);
    
      const onDelete = async(todoId)=>{
        try{
          await axios.delete(`http://localhost:8800/api/todo/update/${todoId}`,{
            headers:{Authorization:localStorage.getItem("token")}
          })
          swal({
            text:"Todo deleted successfully!",
            icon:"success"
          })

          getTodos()

        }catch(err){
          swal({
            text:"Failed to delete Todo!",
            icon:"error"
          })

        }
      }
      
      const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
        },
        {
          title: 'Title',
          dataIndex: 'title',
        },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (status)=> (status? "Completed": "Incomplete"),
        },
        {
          title: 'Delete',
          dataIndex: '_id',
          render:(id)=>(
            <DeleteOutlined
            onClick={()=> onDelete(id)}/>
          )
        },
        {
          title: 'Edit',
          dataIndex: '_id',
          render:(id)=>(
            <EditOutlined

            />
          )
        },
      ];
      
      
      
return(
    <>
    <div className="settings">

    <Table dataSource={todos} columns={columns} />;
        
    
        {/* <div className="qr"> */}
        {/* <QRCode type="canvas" value="https://ant.design/" />
        </div> */}
        </div>
    </>
)

}

export default Settings