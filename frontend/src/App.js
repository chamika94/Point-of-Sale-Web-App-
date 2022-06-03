import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Sale from './pages/Sale';
import Payment from './pages/Payment';
import Register from './pages/Register';
import Employee from './pages/Employee';
import ItemList from './pages/ItemList';
import TransactionList from './pages/TransactionList';
import EmployeeList from './pages/EmployeeList';
import TransactionByEmployee from './pages/TransactionByEmployee';
import ItemByEmployee from './pages/ItemByEmployee';
import DashboardAdmin from './pages/DashboardAdmin';
import ManagerList from './pages/ManagerList'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "./redux/features/authSlice";
import { getEmployee } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import TransactionListAdmin from './pages/TransactionListAdmin';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setUser(user));
    dispatch(getEmployee());
    
  },[])

  return (
    <BrowserRouter>
    <div className="App">
           <ToastContainer/>
               <Header/> 
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/addTour" element={
                        <PrivateRoute>
                                <AddEditTour/>
                        </PrivateRoute>
                        }/>   
                        <Route path="/tour/:id" element={<SingleTour/>}/>      
                        <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                        }/>       
                        <Route path="/editTour/:id" element={
                        <PrivateRoute>
                              <AddEditTour/>
                        </PrivateRoute>
                        }/>    
                        <Route path="/sale" element={<Sale/>}/>   
                        <Route path="/payment" element={<Payment/>}/>  
                        <Route path="/employee" element={<Employee/>}/>    
                        <Route path="/itemList" element={<ItemList/>}/> 
                        <Route path="/transaction" element={<TransactionList/>}/> 
                        <Route path="/employeeList" element={<EmployeeList/>}/>  
                        <Route path="/transaction/:id" element={<TransactionByEmployee/>}/>  
                        <Route path="/item/:id" element={<ItemByEmployee/>}/> 
                        <Route path="/editemployee/:id" element={<Employee/>}/> 
                        <Route path="/dashboardAdmin/" element={<DashboardAdmin />}/> 
                        <Route path="/employeeList/:id" element={<EmployeeList/>}/>    
                        <Route path="/managerList" element={<ManagerList/>}/>    
                        <Route path="/transactionListAdmin" element={<TransactionListAdmin/>}/>   
                        
                      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
