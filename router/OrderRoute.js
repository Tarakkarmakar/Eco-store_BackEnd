const express = require("express");

const { OrderModel } = require("../models/OrderModel");

const OrderRoute = express.Router();

OrderRoute.get("/", async (req, res) => {
  const email = req.headers.authorization.split(" ")[0];

  const products = await OrderModel.find({ email: email });

  res.send(products);
});
OrderRoute.get("/All", async (req, res) => {
  const products = await OrderModel.find();

  res.send(products);
});

OrderRoute.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    
      const new_product = new OrderModel(payload);

      await new_product.save();
   
       
    res.send({ msg: "products has been save" });
  } catch (err) {
    res.send({ Invalid: err });
  }
});

OrderRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await OrderModel.findByIdAndDelete({ _id: id });

    res.send({ msg: "products is deleted" });
  } catch (err) {
    console.log(err);
  }
});

OrderRoute.delete("/deleteUserOrder/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await OrderModel.findByIdAndDelete({OrderedBy: id });

    res.send({ msg: "userOrder is deleted" });
  } catch (err) {
    console.log(err);
  }
});


module.exports = {
  OrderRoute,
};
