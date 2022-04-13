import "reactjs-popup/dist/index.css";
import TableItems from "../TableItems";
import React from "react";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function Table({ table, dispatch }) {
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    dispatch({ type: "addItemToTable", payload: { id: table.id } });
  }

  const [open, setOpen] = React.useState(false);
  function handlePopUp() {
    setOpen(!open);
  }

  return (
    <>
      <div
        className="card shadow mt-4"
        draggable
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handlePopUp}
      >
        <div className="card-body">
          <Typography variant="h4">{table.label}</Typography>
          <Typography variant="h6">Bill : {table.bill}</Typography>
          <Typography variant="h6">
            TotalItems : {table.items.length}
          </Typography>
        </div>
      </div>
      <Dialog open={open} onClose={handlePopUp}>
        <DialogTitle style={{ background: "#619196", color: "white" }}>
          <div>
            <Typography variant="h5">{table.label}: Ordered Items</Typography>
            <IconButton
              onClick={handlePopUp}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <div>
          <TableItems
            key={table.id}
            table={table}
            dispatch={dispatch}
            handlePopUp={handlePopUp}
          />
        </div>
      </Dialog>
    </>
  );
}
