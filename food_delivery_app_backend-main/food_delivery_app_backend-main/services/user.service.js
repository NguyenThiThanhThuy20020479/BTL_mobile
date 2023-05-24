const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getUserData = async (username) => {
  try {
    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne({ username });

    if (userObject) {
      return {
        status: true,
        message: "User found successfully",
        data: userObject,
      };
    } else {
      return {
        status: false,
        message: "No user found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "User finding failed",
      error: `User finding failed : ${error?.message}`,
    };
  }
};

const updateUserData = async(username, user) =>{
  try {
    updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .updateOne(
        {"username": username },
        { $set: {
          email: user?.email,
        } },
        { upsert: true }
      );
      return {
        status: true,
        message: "successfully"
      }
  
  } catch (error) {
    return {
      status: false,
      message: "Item Added to Cart Failed",
    };
  }
}

module.exports = { getUserData, updateUserData};
