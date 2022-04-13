let menuTaken = false;

function addItem(table, state) {
  const item = state.currentMenuItem;
  const actualItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    count: 1,
  };
  let added = false;
  table.items = table.items.map((t) => {
    if (t.id === item.id) {
      added = true;
      const newCount = t.count + 1;
      return { ...t, count: newCount };
    }
    return t;
  });

  if (added === false) {
    return [...table.items, actualItem];
  } else {
    return table.items;
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case "setItem":
      menuTaken = true;
      return { ...state, currentMenuItem: action.payload };

    case "addItemToTable":
      if (menuTaken === false) return state;
      const tableId = action.payload.id;
      let updatedTables = [...state.tables];
      updatedTables.map((table) => {
        if (table.id === tableId) {
          const items = addItem(table, state);
          table.items = items;
          table.bill += state.currentMenuItem.price;
        }
        return table;
      });
      menuTaken = false;
      return { ...state, tables: updatedTables };

    case "onitemCountChange":
      const newItem = action.payload.newItem;
      const tabid = action.payload.tableId;
      const allTables = [...state.tables];
      const newTablesList = allTables.map((table) => {
        if (table.id === tabid) {
          let allItems = table.items;
          let newBill;
          const newItemsList = allItems.map((item) => {
            if (item.id === newItem.id) {
              newBill =
                table.bill + (newItem.count - item.count) * newItem.price;
              return { ...item, count: newItem.count };
            }
            return item;
          });
          return { ...table, items: newItemsList, bill: newBill };
        }
        return table;
      });
      return { ...state, tables: newTablesList };

    case "deleteItem":
      const tId = action.payload.tableId;
      const itemId = action.payload.item.id;
      const itemPrice = action.payload.item.price;
      const itemCount = action.payload.item.count;
      let newBill;
      const newtablesList = state.tables.map((table) => {
        if (table.id === tId) {
          const updatedItems = table.items.filter((item) => item.id !== itemId);
          newBill = table.bill - itemPrice * itemCount;
          return { ...table, items: updatedItems, bill: newBill };
        }
        return table;
      });
      return { ...state, tables: newtablesList };

    case "emptyTable":
      const updated = state.tables.map((table) => {
        if (table.id === action.payload) {
          table.bill = 0;
          table.items = [];
        }
        return table;
      });
      return { ...state, tables: updated };

    default:
      return state;
  }
}
