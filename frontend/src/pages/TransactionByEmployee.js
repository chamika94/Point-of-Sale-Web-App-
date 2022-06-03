
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
import { getTransactions } from '../redux/features/posSlice';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

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

const TransactionByEmployee = () => {
 
  const {id} = useParams();
  const navigate = useNavigate();

  const classes = useStyles();
  const buttonStyles = useButtonStyles();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({...state.auth}));
  const { transactions } = useSelector((state) => ({...state.pos}));

  const filterTransaction = transactions.filter(tran => tran.creator === id);
  
  useEffect(()=>{
    dispatch(getTransactions());
    
  },[])
 // console.log("resp",filterTransaction);

  const handleDelete = (id) => {
    //if(window.confirm("Are you sure to delete?")){
     // dispatch(deleteUser(id));
   // }
  }
 // const navigate = useNavigate();
 // console.log("resp",filterTransaction);
  return (
    <div >
            <div style={{marginLeft:"100px", marginTop:"100px"}}>

              {user && user.result.isMainAdmin? 
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
              : 
                  <MDBBtn
                  tag="a"
                  color="none"
                  style={{ float: "left", color: "#000" }}
                  onClick={() => navigate("/employeeList")}
                >
                  <MDBIcon
                    fas
                    size="lg"
                    icon="long-arrow-alt-left"
                    style={{ float: "left" }}
                  />
                </MDBBtn>
              }

          </div>
      
      <Grid style={{marginTop:"100px"}}container spacing={3}>
        <Grid item xs>
         
        </Grid>
        <Grid item xs={10}>
     <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
     
            <StyledTableCell align="center">Transaction No</StyledTableCell>
            <StyledTableCell align="center">Creator</StyledTableCell>
            <StyledTableCell align="center">Items</StyledTableCell>
            <StyledTableCell align="center">date</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterTransaction && filterTransaction.map((tra) => (
            <StyledTableRow key={tra._id}>
              <StyledTableCell align="center">{tra.TransactionNumber}</StyledTableCell>
              <StyledTableCell align="center">
               {tra.creator}
              </StyledTableCell>
              <StyledTableCell align="center"><Link to={`/item/${tra.TransactionNumber}`}>Items List</Link></StyledTableCell>
              <StyledTableCell align="center">{tra.createAt}</StyledTableCell>
              <StyledTableCell align="center">{tra.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>     
        </Grid>
        <Grid item xs>
          
        </Grid>
      </Grid>

    
    </div>
  )
}

export default TransactionByEmployee