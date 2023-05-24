var express = require("express");
const { getUserData, updateUserData } = require("../services/user.service");
var router = express.Router();

router.get("/get-user", async (req, res) => {
  let username = req?.username;
  let response = await getUserData(username);
  res.json(response);
});

router.put("/update", async(req, res)=>{
  let username = req?.username;
  let body = req.body;
  console.log(username);
  console.log(body);
  let response = await updateUserData(username, body);
  res.json(response);
})

module.exports = router;
