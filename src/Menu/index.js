import React from "react";
import MenuItem from "../MenuItem";

export default function Menu({ menu, dispatch }) {
  const [menuSearchText, setSearchText] = React.useState("");
  function menuSearchTextChanged(event) {
    setSearchText(event.target.value);
  }

  return (
    <>
      <input
        type="search"
        className="form-control rounded p-2"
        onChange={menuSearchTextChanged}
        placeholder="Search Item..."
      />
      {menu.map((item) =>
        item.name.toLowerCase().includes(menuSearchText.toLowerCase()) ? (
          <MenuItem key={item.id} item={item} dispatch={dispatch} />
        ) : null
      )}
      <br></br>
    </>
  );
}
