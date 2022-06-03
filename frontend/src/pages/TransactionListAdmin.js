
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

const TransactionListAdmin = () => {

  const navigate = useNavigate();
 
  const classes = useStyles();
  const buttonStyles = useButtonStyles();

  const dispatch = useDispatch();

  const { transactions } = useSelector((state) => ({...state.pos}));

  
  useEffect(()=>{
    dispatch(getTransactions());
    
  },[])

  return (
    <div >
    
  {/*
    <div className="d-flex justify-content-center mb-3">
              <div className="search-bar-container">  
                      <div style={{ height: "100%",marginTop:"100px" }}>
                            <input
                                type="date"
                                name="search"
                                className="search-bar"
                                autoComplete="off"
                              
                              //  ref={inputRef}
                              // value={search}
                              //  onClick={showSuggestion}
                              //  onChange={e => setSearch(e.target.value)}
                              //  onKeyDown={e => keyboardNavigation(e)}
                            />
                      </div>
              </div>
      </div>

  */}

      <Grid style={{marginTop:"100px"}}container spacing={3}>

        <Grid item xs>
         
        </Grid>
        <Grid item xs={10} >
          <div className="search-result1">
     <TableContainer component={Paper} >
      <Table className={classes.table}  aria-label="customized table">
        <TableHead>
          <TableRow>
     
            <StyledTableCell align="center">Transaction No</StyledTableCell>
            <StyledTableCell align="center">Creator</StyledTableCell>
            <StyledTableCell align="center">Items</StyledTableCell>
            <StyledTableCell align="center">date</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {transactions && transactions.map((tra) => (
            <StyledTableRow key={tra._id} >
              <StyledTableCell align="center">{tra.TransactionNumber}</StyledTableCell>
              <StyledTableCell align="center">
               { tra.creator}
              </StyledTableCell>
              <StyledTableCell align="center"><Link to={`/item/${tra.TransactionNumber}`}>Items List</Link></StyledTableCell>
              <StyledTableCell align="center">{tra.createAt}</StyledTableCell>
              <StyledTableCell align="center">{tra.total}</StyledTableCell>
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
      <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/dashboardAdmin")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
      </MDBBtn>
      </div>
    </div>
  )
}

export default TransactionListAdmin