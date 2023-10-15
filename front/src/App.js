import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { fetchUser } from "./utils/user/user.utils";

import Home from "./components/Home";
import BuyPage from "./routes/BuyPage";
import SellPage from "./routes/SellPage";
import UserPage from "./routes/UserPage";
import ChatPage from "./routes/ChatPage";
import NavBar from "./components/shared/NavBar";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = new Date() / 1000;
      if (now < loginExp) {
        fetchUser(loginData, dispatch);
      } else {
        localStorage.setItem("login", null);
      }
    }
  }, [dispatch]);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <div style={{ minHeight: "100vh" }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/*" element={<BuyPage />} />
            <Route path="/sell/*" element={<SellPage />} />
            <Route path="/user/*" element={<UserPage />} />
            <Route path="/chat/*" element={<ChatPage />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
