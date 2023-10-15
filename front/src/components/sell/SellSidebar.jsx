import React from "react";
import SideBar from "../shared/SideBar";
import { Link } from "react-router-dom";
import "./sellsidebar.css";

const SellSideBar = () => {
  return (
    <SideBar>
      <div className="list-group">
        <Link
          to="/sell/list"
          className="list-group-item list-group-item-action"
        >
          My Selling List
        </Link>
        <Link to="/sell/new" className="list-group-item list-group-item-action">
          Sell a new one
        </Link>
      </div>
    </SideBar>
  );
};

export default SellSideBar;
