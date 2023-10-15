import React from "react";
import UserSideBar from "../components/user/UserSideBar";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../components/user/UserProfile";
import EditProfile from "../components/user/EditProfile";
import Favorites from "../components/user/Favorites";
const UserPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserSideBar />
      <Layout>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default UserPage;
