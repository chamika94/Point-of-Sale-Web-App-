
import React,{ useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import {useNavigate} from 'react-router-dom';
import {getEmployee, deleteEmployee} from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useParams } from 'react-router-dom';

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// ============================
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const EmployeeList = () => {
 
  useEffect(()=>{
    
    dispatch(getEmployee());
    
  },[])
  
  const {id} = useParams();
  const classes = useStyles();
  const buttonStyles = useButtonStyles();

  const dispatch = useDispatch();
  const [filterEmployee, setFilterEmployee]=useState([]);
  const { employee, user } = useSelector((state) => ({...state.auth}));

  useEffect(()=>{
    if(employee){
      if(id){
        const FilterEmployee = employee.filter(emp => emp.creator === id);
       // console.log("resp",FilterEmployee);
        setFilterEmployee(FilterEmployee);
      }else{
        const FilterEmployee = employee.filter(emp => emp.creator === user.result._id);
        setFilterEmployee(FilterEmployee);
      }

    }   
  },[employee])
  
 // console.log("resp",filterEmployee);

  const handleDelete = (empId) => {
    if(window.confirm("Are you sure to delete?")){
      dispatch(deleteEmployee(empId));
    }
  }

  const navigate = useNavigate();

  return (
    <div >
      <Grid style={{marginTop:"100px"}}container spacing={3}>
        <Grid item xs>
         
        </Grid>
        <Grid item xs={10}>
        <div className="search-result1">
     <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Cashier Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Performence</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterEmployee && filterEmployee.map((empl) => (
            <StyledTableRow key={empl._id}>
              <StyledTableCell align="center">{empl.name}</StyledTableCell>
              <StyledTableCell align="center">{empl.email}</StyledTableCell>
             <StyledTableCell align="center"><Link to={`/transaction/${empl._id}`}>Transaction</Link></StyledTableCell> 
              <StyledTableCell align="center">
              <div className={buttonStyles.root}>
                      <ButtonGroup variant="contained"  aria-label="contained primary button group">
                        <Button style={{marginRight: "5px"}}
                         color="secondary"
                         onClick={()=> handleDelete(empl._id)}
                         >Delete</Button>
                       {/* <Button color="primary" onClick={() => navigate(`/editemployee/${empl._id}`)}>Edit</Button>*/}
                      </ButtonGroup>  
              </div>        
              </StyledTableCell>
            </StyledTableRow>
          ))}
  
        </TableBody>
      </Table>
    </TableContainer>     
    </div>
        </Grid>
        <Grid item xs>
          
        </Grid>
      </Grid>
      <div style={{marginLeft:"100px", marginTop:"-40px"}}>
        {user && user.result.isManager?
       <>
         <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/dashboard")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
          </MDBBtn>
       </> 
      :<>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/managerList")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
      </>
      }
      </div>
    </div>
  )
}

export default EmployeeList