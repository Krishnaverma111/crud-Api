const express = require("express");
const { createuser, getall, getone, update, deleteUser } = require("../Usercontroller/usercontroller.js");
const route = express.Router();

route.post("/createuser", createuser);
route.get("/getall", getall);
route.get("/getone/:id", getone);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

route.all("/*", (req, res) => {
    return res.status(404).send({ status: false, msg: "Invalid route" });
});

module.exports = route;
