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
  items : []
}

const Sale = () => {


const dispatch = useDispatch();
const navigate = useNavigate();

const [itemState, setItemState] = useState(initialItemstate);
const [country, setcountry] = useState(initialCountryData); 
const {title, price} = country;


const [addItemModal, setAddItemModal] = useState(false)  
const [itemData, setItemData] = useState(initialItemData);    
const {id, itemName, quantity, itemPrice} = itemData;
const inputReference = useRef(null);

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
  }
 
}, [country]);

const onInputChange = (e) =>{
    let {name,value} = e.target;
    setItemData({...itemData,[name]:value});
};

const  handleSubmit = (e) => {
    e.preventDefault();
    setAddItemModal(false);
    //console.log("resp1",itemData);
    itemState.items.push(itemData);
   // console.log("resp2",state.items);

  };

const handleCheckout = () => {
      var items = itemState.items;
      dispatch(createTransaction({items, toast, navigate}));
      setItemState({items:[]});
}
  
const renderModal = () => {
    return (
      <Modal show={addItemModal} onEntered={() => inputReference.current.focus()}>
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
                      ref={inputReference}
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
  const renderLivePos = () => {
   // console.log("resp3",state.items);
    if (itemState.items.length === 0) {
      return <tr style={{textAlign:"center"}}><p> No products added</p></tr>
    } else {
        return itemState.items.map(
            item => <LivePos {...item} />
            
          );
    }
  };
  return (
    <div>
      
        <h1 style={{marginTop:"100px"}}></h1>
        {renderModal()}
        
             <table className="pos table table-responsive table-striped table-hover">
                 <thead>
                 <tr>
                <td colspan="6" className="text-center">
                  <span className="pull-left">
                    <button
                      onClick={() => setAddItemModal(true)}
                      className="btn btn-default btn-sm"
                    >
                     <BsAlignMiddle/> Add Item
                    </button>
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
                           <AutoComplete data={tours}  onSelect={country => setcountry(country)}/>

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