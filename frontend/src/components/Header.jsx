import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// import logo from '../assets/logo.png'

const Header = () => {

  const { cartItems } = useSelector(state => state.cart);

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
              <NavLink 
                to="/cart" 
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
              </NavLink>
              <NavLink 
                to="/signin" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                <FaUser /> Sign In
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
