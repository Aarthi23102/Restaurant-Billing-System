import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function OrderHistory() {
  var [ordersArray, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getOrders")
      .then((response) => {
        let ordersFromDb = response.data.data;
        setOrders(ordersFromDb);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <h1 className="display-4">History</h1>
      <Table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ordersArray.map((order) => {
            return (
              <tr>
                <td>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                    >
                      {order.items.length} item(s) ordered
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th>Total amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => {
                            return (
                              <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.count}</td>
                                <td>{item.price * item.count}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </td>
                <td>{order.amount}</td>
                <td>{order.date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
