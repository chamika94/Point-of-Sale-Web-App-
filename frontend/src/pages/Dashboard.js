import React from 'react';
import {Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

const navigate = useNavigate();

const {user} = useSelector((state)=>({...state.auth}));
const itemList = () => {
  navigate('/itemList');
}
const cashierList = () => {
  navigate('/employeeList');
}
const transaction = () => {
  navigate('/transaction');
}

  return (
    <>
    <span className="pull-left">
    <div style={{marginTop:"100px",width:"50%",height:"200px",fontSize:"27px"}} className="mb-0 badge badge-primary">
    <h1>{user.result.name}'s Dashboard</h1>
    <h5>{user.result.email}</h5>
    <p><b>Position : </b>Manager</p>
    </div>    
    </span>
           <br></br>
    <div style={{marginTop:"50px"}} className="mb-2">
    <Button onClick={itemList} style={{width:"150px"}} variant="success" size="lg">
      Items List
    </Button>{' '}
    <Button onClick={cashierList} style={{width:"150px"}} variant="secondary" size="lg">
       Cashier List 
    </Button>{' '}
    <Button onClick={transaction} style={{width:"150px"}} variant="warning" size="lg">
      Transaction
    </Button>    

  </div>
  </>
  )
}

export default Dashboard