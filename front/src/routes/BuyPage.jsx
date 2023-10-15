import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "../components/buy/ProductList.jsx";
import ProductItem from "../components/buy/ProductItem.jsx";

const BuyPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/:id" element={<ProductItem />} />
    </Routes>
  );
};

export default BuyPage;
