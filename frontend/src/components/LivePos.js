import React from "react";
import {MDBBtn,MDBIcon} from "mdb-react-ui-kit";

const LivePos = ({data, onChange}) => {
 //console.log("respo",data);
  const handleChange = (id, value) => {
   onChange(id, value);
   //console.log("resp1",value);
  };

  var id = data.id;
    
    return (
      <tr>
        <td className="col-md-2">{data.itemName}</td>
        <td className="col-md-2">{data.itemPrice}</td>
        <td className="col-md-2">{data.quantity}</td>
        
        <td className="col-md-2">0</td>
        <td className="col-md-2">{data.itemPrice*data.quantity}</td>
        <td className="col-md-2">
                     <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleChange(id, "delete")}
                        />
                      </MDBBtn>
        </td>
      </tr>
  );
}

export default LivePos;
