import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../shared/SideBar";

const UserSideBar = () => {
  return (
    <SideBar>
      <div className="list-group">
        <Link
          to="/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </Link>
        <Link
          to="/user/edit-profile"
          className="list-group-item list-group-item-action"
        >
          Edit Profile
        </Link>
        <Link
          to="/user/favorites"
          className="list-group-item list-group-item-action"
        >
          Favorites
        </Link>
      </div>
    </SideBar>
  );
};

export default UserSideBar;
