import React ,{useState, useEffect, useRef} from 'react'
import { Form, Button, Modal, Table } from 'react-bootstrap';
import LivePos from '../components/LivePos';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
    MDBInput,
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";
import { BsAlignMiddle } from "react-icons/bs";
import { useDispatch, useSelector} from 'react-redux';
import { createTransaction } from '../redux/features/posSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AutoComplete from '../components/AutoComplete';
import { getTours } from "../redux/features/tourSlice";


const initialItemData = {
    id : -2,
    itemName : "",
    itemPrice : "",
    quantity : "",
};

const initialCountryData = {
  title : "",
  price : "",
  
};

const initialItemstate = {
  items : [],
  total : 0
}

const Sale = () => {


const dispatch = useDispatch();
const navigate = useNavigate();

const [itemState, setItemState] = useState(initialItemstate);
const [country, setcountry] = useState(initialCountryData); 
const {title, price} = country;
const {total, items} = itemState;


const [addItemModal, setAddItemModal] = useState(false)  
const [itemData, setItemData] = useState(initialItemData);    
const {id, itemName, quantity, itemPrice} = itemData;
const modalReference = useRef(null);
const inputReference = useRef(null);

useEffect(() => {
  inputReference.current.focus();
}, []);

  useEffect(() => {
    dispatch(getTours());
  }, []);

const { tours, loading } = useSelector(
    (state) => ({
      ...state.tour,
    })
);

useEffect(() => {
  setItemData({
    id:id+1,
    itemName:title,
    itemPrice:price,
  });
  
  if(title!==""){
    setAddItemModal(true);
  };
}, [country]);

const onInputChange = (e) =>{
    let {name,value} = e.target;
    setItemData({...itemData,[name]:value});
};
const handleCheckOut1 = () => {
  var items = itemState.items;
  var totalCost = 0;
  for (var i = 0; i < items.length; i++) {
    var price = items[i].itemPrice * items[i].quantity;
    totalCost = parseInt(totalCost, 10) + parseInt(price, 10);
  }
  setItemState({ ...itemState,total: totalCost });
  
};

const  handleSubmit = (e) => {
    e.preventDefault();
    setAddItemModal(false);
    //console.log("resp1",itemData);
    itemState.items.push(itemData);
     
  };

const handleCheckout = () => {
      var items = itemState.items;
      dispatch(createTransaction({items, toast, navigate}));
      setItemState({items:[]});
      inputReference.current.focus();
}
  
const renderModal = () => {
    return (
      <Modal show={addItemModal} onEntered={() => modalReference.current.focus()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <MDBCard alignment="center">
                <h5></h5>
                <MDBCardBody>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control 
                      type="number"
                      name="quantity"
                      value={quantity}
                      ref={modalReference}
                      onChange={onInputChange}
                      placeholder="Enter Quantity"
                  />
                </Form.Group>
                <Button style={{width:"100%"}} variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
                </MDBCardBody>
            </MDBCard>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={() => setAddItemModal( false)}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleChange = (id, value) => {
    var items = itemState.items;
    if (value === "delete") {
      var newitems = items.filter(function(item) {
        return item.id !== id;
      });
      setItemState({ items: newitems });
      inputReference.current.focus();
     // console.log("resp",newitems);
    }
    
  };


  const renderLivePos = () => {
   // console.log("resp3",state.items);
    if (itemState.items.length === 0) {
      return <tr style={{textAlign:"center"}}><td></td><td></td><td><p> No products added</p></td><td></td><td></td><td></td></tr>
    } else {
        return itemState.items.map(
            item => <LivePos data={item} onChange={handleChange}/>
            
          );
    }
  };
  useEffect(() => {
    handleCheckOut1();
  }, [{handleSubmit, handleChange}]);
  return (
    <div>
      
        <h1 style={{marginTop:"100px"}}></h1>
        {renderModal()}
        
             <table className="pos table table-responsive table-striped table-hover">
                 <thead>
                 <tr>
                <td colspan="6" className="text-center">
                  <span className="pull-left">
                   {/* <button
                      onClick={() => setAddItemModal(true)}
                      className="btn btn-default btn-sm"
                    >
                     <BsAlignMiddle/> Add Item
                    </button>*/}

                    {total && total ? (<div style={{width:"40%",height:"50px",fontSize:"27px"}} className="mb-0 badge badge-primary">Total : <b>{total}</b> </div>) : 
                      (<div style={{width:"40%",height:"50px",fontSize:"27px"}} className="mb-0 badge badge-primary">Total : <b> 0 </b> </div>)
                    }
                  </span>
                </td>
              </tr>
                 </thead>
             </table>


             <div className="row">
                <div className="col text-center">

                  <div className="header1">
                  <h2>Search Products!!!</h2>
                  <p>You can search a Products by it's name</p>
                  </div>

                    <div className="d-flex justify-content-center mb-3">
                        <div className="search-bar-container">
                           <AutoComplete data={tours}  onSelect={country => setcountry(country)}  inputRef={inputReference} saveData={handleCheckout}/>
                        </div>
                    </div>
                </div>
            </div>

<br></br>

          
<div
      style={{
        margin:"auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}>
        <Table striped bordered hover variant="dark">
            <thead>
              <tr className="titles">
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Tax</th>
                <th>Total</th>
                <th>action</th>
                <th />
              </tr>
            </thead>
            <tbody> {renderLivePos()} </tbody>
          </Table> 
    </div>         
          <div >
          <button
                className="btn btn-success lead"
                id="checkoutButton"
                onClick={handleCheckout}
              >
                <i className="glyphicon glyphicon-shopping-cart" />
                <br />
                <br />
                C<br />
                h<br />
                e<br />
                c<br />
                k<br />
                o<br />
                u<br />
                t
              </button>    
          </div>    
    </div>
  )
}

export default Sale