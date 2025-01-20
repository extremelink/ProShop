import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from 'react-toastify'

const Header = () => {

  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/login')
    }catch(err){
      toast.error(err?.message?.error || err?.error)
    }
}

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Link to="/" className="navbar-brand">
            <HiMiniShoppingCart className="me-2 fs-2" />
            ProShop
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                <FaShoppingCart /> Cart
                {
                  cartItems.length > 0 && (
                    <span className="badge rounded-pill bg-success ms-2">
                      { cartItems.reduce((a, c) => a + Number(c.qty), 0) }
                    </span>
                  )
                }
              </Nav.Link>
              
              { userInfo ? (

                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item
                    as={Link}
                    to='/profile'
                  >Profile</NavDropdown.Item>
                        <NavDropdown.Item 
                          onClick={logoutHandler}>
                            Logout
                          </NavDropdown.Item>           
                </NavDropdown>
              ): (
                    <Nav.Link 
                    as={Link}
                    to="/login" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                    <FaUser /> Sign In
                    </Nav.Link>
              ) }
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title ='Admin' id='adminmenu'>
                  <NavDropdown.Item 
                  as = {Link}
                  to ='/admin/productlist'>Products</NavDropdown.Item>
                  <NavDropdown.Item
                    as = {Link}
                    to = '/admin/userlist'
                    >
                    Users</NavDropdown.Item>
               
                  <NavDropdown.Item
                    as={Link}
                    to = '/admin/orderlist'
                  >Orders</NavDropdown.Item>
                </NavDropdown>
              ) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
