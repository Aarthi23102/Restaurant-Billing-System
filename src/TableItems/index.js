import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

export default function TableItems({ table, dispatch, handlePopUp }) {
  function paymentSuccessful() {
    handlePopUp();
    dispatch({ type: "emptyTable", payload: table.id });
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>TotalPrice</th>
          </tr>
        </thead>
        <tbody>
          {table.items.map((item) => {
            return (
              <>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={item.count}
                      min={1}
                      onChange={(event) => {
                        dispatch({
                          type: "onitemCountChange",
                          payload: {
                            newItem: { ...item, count: event.target.value },
                            tableId: table.id,
                          },
                        });
                      }}
                    />
                  </td>
                  <td>{item.count * item.price}</td>
                  <td>
                    <IconButton
                      onClick={() => {
                        dispatch({
                          type: "deleteItem",
                          payload: { tableId: table.id, item: item },
                        });
                      }}
                      aria-label="close"
                      sx={{
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      {table.items.length === 0 ? (
        <Typography variant="h4" className="p-5">
          No items Ordered
        </Typography>
      ) : null}

      <div style={{ padding: "10px" }}>
        <Typography variant="h5" style={{ float: "left" }}>
          Total Bill: {table.bill}
        </Typography>
        <button
          className="btn p-2 mb-3"
          style={{ backgroundColor: "#619196", color: "white" }}
          onClick={paymentSuccessful}
          disabled={table.items.length === 0 ? true : false}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}
