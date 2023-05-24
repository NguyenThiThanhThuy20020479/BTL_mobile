var express = require("express");
const { getOneFoodById, getAllFood, updateFood } = require("../services/food.service");
var router = express.Router();

router.get("/:foodId", async (req, res) => {
  let foodId = req?.params?.foodId;
  let response = await getOneFoodById(foodId);
  res.json(response);
});

router.get("/", async(req, res)=>{
  let response = await getAllFood();
  res.json(response);

})

router.post("/update/:foodId", async(req, res)=>{
  let foodId = req?.params?.foodId;
  let body = req.body;
  let response = await updateFood(foodId, body);
  res.json(response);
})
module.exports = router;
