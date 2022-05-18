import React from "react";

const AutoCompleteItem = ({title, price, code, tags, imageFile, onSelectItem, isHighlighted}) => {
 
    return (
        <li
            className={`list-group-item ${
                isHighlighted ? "active highlighted" : ""
            }`}
            onClick={onSelectItem}
        >
            <div className="row">
                <div className="col text-left">
                    <p className="mb-0 font-weight-bold line-height-1">
                        {title}{" "}
                        
                        <img src={imageFile} alt="" style={{ width: "60px",marginLeft:"50%" }} />
                    </p>
                    <div style={{marginTop:"-50px"}}>
                    <p>{tags}</p>
                    <p className="mb-0 badge badge-primary">{price} LKR</p>
                    <p className="mb-0 ml-2 badge badge-secondary">Code {code}</p>
                    </div>

                </div>
            </div>
        </li>
    );
};

export default AutoCompleteItem;