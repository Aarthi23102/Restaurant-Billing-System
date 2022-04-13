import Table from "../Table";
import React from "react";

export default function Tables({ tables, dispatch }) {
  const [searchText, setSearchText] = React.useState("");

  function tableSearchTextChanged(event) {
    setSearchText(event.target.value);
  }

  return (
    <div>
      <input
        type="search"
        className="form-control rounded p-2"
        onChange={tableSearchTextChanged}
        placeholder="Search Table..."
      />

      {tables.map((table) =>
        table.label.toLowerCase().includes(searchText.toLowerCase()) ? (
          <Table key={table.id} table={table} dispatch={dispatch} />
        ) : null
      )}
    </div>
  );
}
