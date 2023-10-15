import React from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Login from "../Login";
import "./addlinkpage.css";

const AddLinkPage = () => {
  const user = useSelector(selectCurrentUser);
  
  const isLoggedIn = !!user;
  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <p>Add your products here and let everyone see them!</p>
        {isLoggedIn ? (
          <Space direction="vertical">
            <Link
              to={{
                pathname: "/sell/form", // Replace with the actual edit product route
                state: { product: null }, // Pass the product as state
              }}
              style={{ textDecoration: "none" }}
            >
              <Button block> Create new products!</Button>
            </Link>
          </Space>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export default AddLinkPage;
