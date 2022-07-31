// import "./App.css";
import Tables from "../Tables";
import Menu from "../Menu";
import React, { useEffect } from "react";
import reducer from "../reducer";
import { Typography } from "@mui/material";
import axios from "axios";
// import OrderHistory from "./OrderHistory";
// import {  Link } from "react-router-dom";

// const initialState = {
//   tables: [
//     { id: 1, bill: 0, items: [], label: "Table 1" },
//     { id: 3, bill: 0, items: [], label: "Table 2" },
//     { id: 4, bill: 0, items: [], label: "Table 3" },
//     { id: 2, bill: 0, items: [], label: "Table 4" },
//   ],
//   menu: [
//     { id: 1, name: "Pizza", price: 149 },
//     { id: 2, name: "Burger", price: 129 },
//     { id: 3, name: "Biryani", price: 249 },
//     { id: 4, name: "Sandwich", price: 99 },
//     { id: 5, name: "French Fries", price: 59 },
//     { id: 6, name: "Noodles", price: 99 },
//     { id: 7, name: "Fried chicken", price: 229 },
//     { id: 8, name: "Cryspy Corn", price: 249 },
//   ],
//   currentMenuItem: {},
// };

function Home() {
  const [initialState, setInitialState] = React.useState({
    tables: [
      { id: 1, bill: 0, items: [], label: "Table 1" },
      { id: 3, bill: 0, items: [], label: "Table 2" },
      { id: 4, bill: 0, items: [], label: "Table 3" },
      { id: 2, bill: 0, items: [], label: "Table 4" },
    ],
    menu: [
      { id: 1, name: "Pizza", price: 149 },
      { id: 2, name: "Burger", price: 129 },
      { id: 3, name: "Biryani", price: 249 },
      { id: 4, name: "Sandwich", price: 99 },
      { id: 5, name: "French Fries", price: 59 },
      { id: 6, name: "Noodles", price: 99 },
      { id: 7, name: "Fried chicken", price: 229 },
      { id: 8, name: "Cryspy Corn", price: 249 },
    ],
    currentMenuItem: {},
  });
  const [{ tables, menu }, dispatch] = React.useReducer(reducer, initialState);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/getItems")
  //     .then((fetchedItems) => {
  //       console.log(fetchedItems.data);
  //       dispatch({ type: "itemsFetchedFromDb", payload: fetchedItems.data });

  //       // initialState.menu = fetchedItems.data;
  //       setInitialState({ ...initialState, menu: fetchedItems.data });
  //       console.log(initialState);
  //     })
  //     .catch((err) => console.log("error in making axios call for getitems"));
  // }, []);
  return (
    <div className="App">
      
      {/* <Link href="orderHistory">Login</Link> */}
      <hr
        style={{ width: "50%", display: "inline-block", alignSelf: "center" }}
      ></hr>
      <div className="row m-0">
        <div className="col-sm-1"></div>
        <div className="col-sm-3">
          <Typography variant="h4" className="mb-3">
            Tables
          </Typography>
          <Tables dispatch={dispatch} tables={tables} />
        </div>
        <div className="col-sm-1"></div>

        <div className="col-sm-6">
          <Typography variant="h4" className="mb-3">
            Menu
          </Typography>
          <Menu dispatch={dispatch} menu={menu} />
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  );
}

export default Home;