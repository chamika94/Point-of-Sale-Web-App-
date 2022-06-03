
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
import { getItems, getTransactions } from '../redux/features/posSlice';
import { Link } from "react-router-dom";
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

const ItemByEmployee = () => {
 
  const {id} = useParams();

  const classes = useStyles();
  const buttonStyles = useButtonStyles();

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getItems());
    dispatch(getTransactions());
    
  },[])


  const { user } = useSelector((state) => ({...state.auth}));
  const { items, transactions } = useSelector((state) => ({...state.pos}));
 // const filterTransaction = transactions.filter(tra => tra.TransactionNumber === parseInt(id));
 
  const filterItems = items.filter(item => item.TransactionNumber === parseInt(id));
  console.log("resp",items);

  const handleDelete = (id) => {
    //if(window.confirm("Are you sure to delete?")){
     // dispatch(deleteUser(id));
   // }
  }
 // const navigate = useNavigate();
 // console.log("resp",filterTransaction);
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
     
            <StyledTableCell align="center">Transaction No</StyledTableCell>
            <StyledTableCell align="center">Creator</StyledTableCell>
            <StyledTableCell align="center">Items</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">date</StyledTableCell>
  
          </TableRow>
        </TableHead>
        <TableBody>
          {filterItems && filterItems.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell align="center">{item.TransactionNumber}</StyledTableCell>
              <StyledTableCell align="center">
               {item.creator}
              </StyledTableCell>
              <StyledTableCell align="center">{item.itemName}</StyledTableCell>
              <StyledTableCell align="center">{item.quantity}</StyledTableCell>
              <StyledTableCell align="center">{item.createAt}</StyledTableCell>
      
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

    
    </div>
  )
}

export default ItemByEmployee