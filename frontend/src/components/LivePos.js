import React from "react";
import {MDBBtn,MDBIcon} from "mdb-react-ui-kit";

const LivePos = (item) => {
 
    //console.log("resp1",item);
    return (
      <tr>
        <td className="col-md-2">{item.itemName}</td>
        <td className="col-md-2">{item.itemPrice}</td>
        <td className="col-md-2">{item.quantity}</td>
        
        <td className="col-md-2">200</td>
        <td className="col-md-2">200</td>
        <td className="col-md-2">
                     <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                      </MDBBtn>
        </td>
      </tr>
  );
}

export default LivePos;
