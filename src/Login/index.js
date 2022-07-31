import { useState } from "react";
import axios from "axios";
import OrderHistory from "../OrderHistory";

function Login() {
  const verifyUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        email: emailId,
        password: pass,
      })
      .then((response) => {
        setRply(response.data);
        if (response.data.message === "valid user") {
          // localStorage.setItem(response.data.payload);
          // alert(response.data.payload);
        }
      })
      .catch((err) => console.log("error in data fetch for login", err));
  };

  const nameChanged = (e) => {
    setemailId(e.target.value);
  };

  const passChanged = (e) => {
    setPass(e.target.value);
  };

  const [emailId, setemailId] = useState("");
  const [pass, setPass] = useState("");
  const [rply, setRply] = useState("");
  return (
    <center>
      {rply.message === "invalid user" && rply.payload === "email" && (
        <p className="text-danger">*invalid email</p>
      )}
      {rply.message === "invalid user" && rply.payload === "password" && (
        <p className="text-danger">*invalid password</p>
      )}
      {rply.message === "valid user" && <OrderHistory />}
      {rply.message !== "valid user" && (
        <div>
          <h1 className="display-5">Login</h1>
          <form style={{ width: "30%" }} onSubmit={verifyUser}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                name="email"
                onChange={nameChanged}
              />
              <label for="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="password"
                name="password"
                onChange={passChanged}
              />
              <label for="pass">Password</label>
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      )}
    </center>
  );
}

export default Login;
