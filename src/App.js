import "./App.css";
import Tables from "./Tables";
import Menu from "./Menu";
import React, { useEffect, useState } from "react";
import reducer from "./reducer";
import { Typography } from "@mui/material";
import axios from "axios";
import OrderHistory from "./OrderHistory";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Link to="" style={{textDecoration: 'none'}} className="display-4">
          Eat Enjoy Repeat
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="orderHistory" style={{textDecoration: 'none'}}>Login</Link>
      <div>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="orderHistory" element={<Login />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
