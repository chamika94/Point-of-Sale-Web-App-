import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";




const CardTour = ({
  imageFile,
  description,
  title,
  price,
  code,
  tags,
  _id,
  name,
  
}) => {

  const excerpt = (str) => {
    if (str.length > 10) {
      str = str.substring(0, 10) + " ...";
    }
    return str;
  };


  return (
    <MDBCardGroup>
        <br></br>
      <MDBCard className="h-100 mt-2 d-md-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
         
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px", objectFit: 'cover'}}
        />
        <div className="top-left">{title}</div>
        <span className="text-start tag-card">
          {tags.map((tag) => (
            <Link key={tag} to={`#`}> #{tag}</Link>
          ))}
        </span>

        <MDBCardBody>
          <MDBCardTitle className="text-start"><b>{price} LKR</b></MDBCardTitle>

          <MDBCardText className="text-start">
            
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
          
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
