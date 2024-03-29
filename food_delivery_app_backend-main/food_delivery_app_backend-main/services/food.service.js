const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getOneFoodById = async (foodId) => {
  try {
    let food = await MongoDB.db
      .collection(mongoConfig.collections.FOODS)
      .findOne({ id: foodId });
    if (food) {
      return {
        status: true,
        message: "Food found successfully",
        data: food,
      };
    } else {
      return {
        status: false,
        message: "No Food found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Food finding failed",
      error: `Food finding failed : ${error?.message}`,
    };
  }
};


const getAllFood = async () => {
  try {
    let foods = await MongoDB.db
      .collection(mongoConfig.collections.FOODS)
      .find()
      .toArray();

    if (foods && foods?.length > 0) {
      return {
        status: true,
        message: "Restaurants found successfully",
        data: foods,
      };
    } else {
      return {
        status: false,
        message: "No restaurants found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Restaurant finding failed",
      error: `Restaurant finding failed : ${error?.message}`,
    };
  }
};

const updateFood = async(foodid, info)=>{
  console.log(foodid);
  console.log(info)
  try {
    updateFood = await MongoDB.db
    .collection(mongoConfig.collections.FOODS)
    .updateOne(
      {"id": foodid },
      { $set: {
        "price": info?.price,
        "description": info?.des,
        "ingredients": info?.in
      } },
      { upsert: true }
    );
    return {
      status: true,
      message: "successfully"
    }

    
  } catch (error) {
    return{
      status: false,
      message: "fail",
      data: error?.message
    }
  }
}
module.exports = { getOneFoodById, getAllFood, updateFood};
