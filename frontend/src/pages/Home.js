import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const { tours, loading } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const dispatch = useDispatch();
  const chamika = () => {
    return (<h1>chamika</h1>);
  } 

  const renderAmountDue = () => {
    return (
      <Modal show={loading}>
        <Modal.Header closeButton>
          <Modal.Title>Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            Amount Due:
            <span className="text-danger"></span>
          </h3>
          <p>Customer payment incomplete; Correct and Try again</p>
        </Modal.Body>
        <Modal.Footer>
          <Button >
            close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };



  useEffect(() => {
    dispatch(getTours());
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        
        padding: "15px",
        maxWidth: "100%",
        alignContent: "center",
      }}
    >
      <MDBContainer>
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
         
            <MDBRow className="row-cols-1 row-cols-md-5 g-3">
              {tours &&
                tours.map((item) => <CardTour key={item._id} {...item} />)}
            </MDBRow>
         
        </MDBCol>
      
        {renderAmountDue()}
      </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Home;
