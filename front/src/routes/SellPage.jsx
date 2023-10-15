import React from "react";
import { Layout } from "antd";
import ProductSellPage from "../components/sell/ProductSellPage.jsx";
import SellSideBar from "../components/sell/SellSidebar.jsx";
import { Routes, Route } from "react-router-dom";
import ProductSoldListPage from "../components/sell/ProductSoldListPage.jsx";
import AddLinkPage from "../components/sell/AddLinkPage.jsx";

const SellPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SellSideBar />
      <Layout className="rightSide">
        <Routes>
          <Route path="/" element={<ProductSoldListPage />} />
          <Route path="/list" element={<ProductSoldListPage />} />
          <Route path="/new" element={<AddLinkPage />} />
          <Route path="/form" element={<ProductSellPage />} />
          <Route path="/edit" element={<ProductSellPage />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default SellPage;
