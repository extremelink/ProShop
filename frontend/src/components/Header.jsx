import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
// import { Link } from "react-router-bootstrap";
import { Link, NavLink } from "react-router-dom";

// import logo from '../assets/logo.png'

const Header = () => {
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
