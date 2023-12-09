const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const TradesModel = require("./models/Trades");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://tapiwachimbwanda4:Yi6jiOjTn2UzYKVr@cluster0.jixknj6.mongodb.net/employee?retryWrites=true&w=majority"
);

// Create a new user using the UserModel
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await TradesModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
app.get("/employees", (req, res) => {
  UserModel.find({})
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

//Get a single user to update
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

// Update a user
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

// Update a user
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
  )
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

// Register a user
app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UserModel.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else if (user.password !== password) {
        res.json("Password does not match");
      }
    } else {
      res.json({ message: "You are not registered" });
    }
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id; // variable id to store parameter id gotten from the database using Params
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server has started on port 3001");
});
