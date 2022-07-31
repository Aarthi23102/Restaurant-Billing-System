const exp = require("express");
const app = exp();
// const mongoose = require("mongoose");
// const orders = require("./models/orders");
const mclient = require("mongodb").MongoClient;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(exp.json());

//connecting frontend and backend
const path = require("path");
app.use(exp.static(path.join(__dirname, "../build")));

//db connection url
const DBUrl =
  "mongodb+srv://aarthi:aarthi@cluster0.ymbsm.mongodb.net/?retryWrites=true&w=majority";

// mongoose
//   .connect(DBUrl)
//   .then((response) => console.log("db connection success"))
//   .catch((err) => console.log("err in db connection ", err));

//using mongo client
let ordersCollection, itemsCollection, userCollection;
mclient
  .connect(DBUrl)
  .then((client) => {
    console.log("connection to db success");

    let dbObj = client.db("RestaurantDb");
    ordersCollection = dbObj.collection("Orders");
    itemsCollection = dbObj.collection("Items");
    userCollection = dbObj.collection("Users");
  })
  .catch((err) => console.log("error in db connect", err));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/storeOrder", (req, res) => {
  ordersCollection
    .insertOne({ amount: req.body.amount, items: req.body.items, date: Date() })
    .then((msg) => {
      console.log(msg);
      res.send("created");
    })
    .catch((err) => {
      console.log("error in insertion", err);
      res.send("error occured");
    });
});

app.get("/getOrders", (req, res) => {
  ordersCollection
    .find()
    .toArray()
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.send({ message: "error in retrieving orders history" });
    });
});

app.post("/createItem", (req, res) => {
  itemsCollection
    .insertOne(req.body)
    .then((msg) => {
      console.log(msg);
      res.send("item created");
    })
    .catch((err) => console.log("error in item creation"));
});

app.get("/getItems", (req, res) => {
  itemsCollection
    .find()
    .toArray()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => console.log("error in get items"));
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  let userFromDb =await userCollection.findOne({
    $and: [{ email: req.body.email }],
  });
  // console.log("userfrom db", userFromDb);
  if (userFromDb === null) res.send({ message: "invalid user", payload: "email" });
  else {
    // let status = await bcryptjs.compare(req.body.password, userFromDb.password);
    // console.log(req.body.password , userFromDb.password);
    let status = (req.body.password === userFromDb.password)
    if (status === false)
      res.send({ message: "invalid user", payload: "password" });
    else {
      let token = jwt.sign({ email: userFromDb.name }, "abcdef", {
        expiresIn: "1h",
      });
      res.send({ message: "valid user", payload: token });
    }
  }
  // { password: req.body.password }
  // .then((reply) => {
  //   if (reply == null) res.send({ message: "invalid user" });
  //   else res.send({ message: "valid user" });
  // })

  // .catch((err) => console.log("error in login", err));
});

//Handling page refresh
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Handling invalid paths
app.use((req, res, next) => {
  res.send({ message: "Invalid path" });
});

// Error Handling
app.use((error, req, res, next) => {
  res.send({ message: "Error occured", reason: `${error.message}` });
});

app.listen(4000, () => console.log("port on 4000"));
