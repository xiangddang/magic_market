import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Badge } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { selectCurrentUser } from "../../store/user/user.selector";
import Login from "../Login";
import Logout from "../Logout";
import "./customNavbar.css";

const NavBar = () => {
  const user = useSelector(selectCurrentUser);
  let badgeCount = 0;
  return (
    <Navbar className="navbar-custom" expand="lg" sticky="top" variant="dark">
      <Container className="container-fluid">
        <Navbar.Brand className="webTitle" as={Link} to="/">
          <img
            src="/images/MarketLogo.png"
            alt="Market logo"
            className="marketLogo"
          />
          {/* MAGIC MARKET */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/product">
              Buy
            </Nav.Link>
            <Nav.Link as={Link} to="/sell">
              Sell
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Badge count={badgeCount}>
          <Navbar.Brand className="messages" as={Link} to="/chat">
            <MessageOutlined className="messageIcon" />
          </Navbar.Brand>
        </Badge>
        <Dropdown>
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            <img
              src={user && user.avatar ? user.avatar : "/images/user.png"}
              alt="user"
              className="userIcon"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {user ? (
              <>
                <Dropdown.Item as={Link} to="/user/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/user/edit-profile">
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/user/favorites">
                  Favorites
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Logout}>Logout</Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item as={Login}>Login</Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default NavBar;
