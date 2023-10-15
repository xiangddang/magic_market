import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "../components/chat/Chat.jsx";

const BuyPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
    </Routes>
  );
};

export default BuyPage;
