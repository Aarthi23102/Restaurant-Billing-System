import "./App.css";
import Tables from "./Tables";
import Menu from "./Menu";
import React from "react";
import reducer from "./reducer";
import { Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

const initialState = {
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
};

function App() {
  const [{ tables, menu }, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div className="App">
      <Typography fontFamily={"Timesnewroman"} variant="h3" className="p-3">
        Eat Enjoy Repeat
      </Typography>
      <hr style={{width:"50%", display:"inline-block", alignSelf:"center"}}></hr>
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

export default App;
