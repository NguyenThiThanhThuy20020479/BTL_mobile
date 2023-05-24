var express = require("express");
const {
  addToCart,
  removeFromCart,
  getCartItems,
  removeCart,
  addToBill,
  getBillItems,
  
} = require("../services/cart.service");
var router = express.Router();

router.get("/", async (req, res) => {
  let username = req?.username;
  let response = await getCartItems({ username });
  console.log(response)
  res.json(response);
});

router.post("/:foodId", async (req, res) => {
  let { foodId } = req?.params;
  let username = req?.username;
  let response = await addToCart({ foodId, username });
  res.json(response);
});

router.delete("/:foodId", async (req, res) => {
  let { foodId } = req?.params;
  let username = req?.username;
  let response = await removeFromCart({ foodId, username });
  res.json(response);
});

router.delete('/delete/removeall', async(req, res)=>{
  let username = req?.username;
  let body = req.body;
  let response = await removeCart({username});
  res.json(response);
})

router.post('/add/bill', async(req, res)=>{
  let username = req?.username;
  let response = await addToBill({username});
  res.json(response);
})

router.get('/bill/all', async(req, res)=>{
  let username = req?.username;
  let response = await getBillItems({ username });
  console.log(response)
  res.json(response);
})

module.exports = router;
