import React,{useState} from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import {useSelector,useDispatch} from "react-redux";
import { setLogout } from '../redux/features/authSlice';
import { Link } from "react-router-dom";

const Header = () => {
 

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const {user} = useSelector((state)=>({...state.auth}));

    const handleLogout = () => {
      dispatch(setLogout());
    };

  return (
    <MDBNavbar fixed='top' expand="lg" style={{backgroundColor:"#0E2C51"}}>
      <MDBContainer>
          <MDBNavbarBrand href="/"
          style={{ color:"#F2F7FD", fontweight:"600", fontSize:"22px"}}
          >
          POS  
          </MDBNavbarBrand>
          <MDBNavbarToggler
           type="button"
           arial-expanded="false"
           aria-label="Togel navigation"
           onClick={() => setShow(!show)}
           style={{ color:"#F2F7FD"}}
          >
           <MDBIcon icon="bars" fas />   
          </MDBNavbarToggler>
          <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
          {user?.result?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "23px" ,color:"#BEC5CE"}}>
                Logged in as: {user?.result?.name}
              </h5>
            )}
                <MDBNavbarItem >
                    <MDBNavbarLink>
                    <Link to={'/'}><p style={{ color:"#F2F7FD"}} className='header-text'>Home</p></Link>
                    </MDBNavbarLink>
                </MDBNavbarItem>

                {user?.result?._id ? (
                  <>
                <MDBNavbarItem >
                    <MDBNavbarLink>
                    <Link to={'/addTour'}><p style={{ color:"#F2F7FD"}} className='header-text'>Add Item</p></Link>  
                    </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem >
                    <MDBNavbarLink >
                        <Link to={`/dashboard`}><p style={{ color:"#F2F7FD"}} className='header-text'>Dashboard</p></Link>  
                    </MDBNavbarLink>
                </MDBNavbarItem> 
                <MDBNavbarItem >
                    <MDBNavbarLink >
                        <Link to={`/sale`}><p style={{ color:"#F2F7FD"}} className='header-text'>Sales</p></Link>  
                    </MDBNavbarLink>
                </MDBNavbarItem>                                 
                <MDBNavbarItem >
                    <MDBNavbarLink  onClick={() => handleLogout()}>
                    <Link to={'/'}><p style={{ color:"#F2F7FD"}} className='header-text'>Logout</p></Link>  
                    </MDBNavbarLink>
                </MDBNavbarItem>
                  </>
                ):(
                  <>
                <MDBNavbarItem >
                    <MDBNavbarLink >
                    <Link to={'/login'}><p style={{ color:"#F2F7FD"}} className='header-text'>Login</p></Link>  
                    </MDBNavbarLink>
                </MDBNavbarItem>
                  </>
                )}


             </MDBNavbarNav>
          </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header