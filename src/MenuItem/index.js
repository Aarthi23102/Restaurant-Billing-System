import { Typography } from "@mui/material";

export default function MenuItem({ item, dispatch }) {
  function handleDragStart(event) {
    dispatch({ type: "setItem", payload: item });
  }

  return (
    <>
      <div className="card shadow mt-4" draggable onDragStart={handleDragStart}>
        <div className="card-body">
          <Typography variant="h4">Name : {item.name}</Typography>
          <Typography variant="h6">Price : {item.price}</Typography>
        </div>
      </div>
    </>
  );
}
