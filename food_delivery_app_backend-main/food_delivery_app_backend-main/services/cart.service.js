const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const addToCart = async ({ foodId, username }) => {
  try {
    let updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .updateOne(
        { foodId, username },
        { $inc: { count: 1 } },
        { upsert: true }
      );
    if (updatedCart?.modifiedCount > 0 || updatedCart?.upsertedCount > 0) {
      let cartResponse = await getCartItems({ username });
      return {
        status: true,
        message: "Item Added to Cart Successfully",
        data: cartResponse?.data,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Item Added to Cart Failed",
    };
  }
};

const addToBill = async({username})=>{
  try {
    //ghi bien thoi gian
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); 

    let cartResponse = await getCartItems({ username });
    console.log(cartResponse?.data?.cartItems?.length);
    for(let i = 0; i < cartResponse?.data?.cartItems?.length;i++){
      let billObject = {
        foodId: cartResponse?.data?.cartItems[i]?.foodId,
        username: cartResponse?.data?.cartItems[i]?.username,
        count: cartResponse?.data?.cartItems[i]?.count,
        time: time,
        date: date,
        status: "Đã đặt"
      };
      console.log(billObject)
      savedBill = await MongoDB.db
        .collection(mongoConfig.collections.BILL)
        .insertOne(billObject); 
        console.log(cartResponse?.data?.cartItems[0])

    }
    console.log(cartResponse?.data?.cartItems[0])
    let billResponse = await getBillItems({username});
    return{
      message: 'successfully',
      status: true,
      data: billResponse?.data
    }
    
  } catch (error) {
    return{
      status:false,
      message: 'fail'
    }  
  } 
}

const getBillItems = async ({ username }) => {
  try {
    let cartItems = await MongoDB.db
      .collection(mongoConfig.collections.BILL)
      .aggregate([
        {
          $match: {
            username: username,
          },
        },
        {
          $lookup: {
            from: "foods",
            localField: "foodId",
            foreignField: "id",
            as: "food",
          },
        },
        {
          $unwind: {
            path: "$food",
          },
        },
      ])
      .toArray();
    if (cartItems?.length > 0) {
      let itemsTotal = cartItems
        ?.map((cartItem) => cartItem?.food?.price * cartItem?.count)
        ?.reduce((a, b) => parseFloat(a) + parseFloat(b));
      let discount = 0;
      return {
        status: true,
        message: "Cart items fetched Successfully",
        data: {
          cartItems,
          metaData: {
            itemsTotal,
            discount,
            grandTotal: itemsTotal - discount,
          },
        },
      };
    } else {
      return {
        status: false,
        message: "Cart items not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Cart items fetched Failed",
    };
  }
};

const removeFromCart = async ({ foodId, username }) => {
  try {
    let cart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .findOne({ foodId, username, count: 1 });
    if (cart) {
      await MongoDB.db
        .collection(mongoConfig.collections.CARTS)
        .deleteOne({ foodId, username });
      let cartResponse = await getCartItems({ username });
      return {
        status: true,
        message: "Item Removed from Cart Successfully",
        data: cartResponse?.data,
      };
    }
    let updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .updateOne(
        { foodId, username },
        { $inc: { count: -1 } },
        { upsert: true }
      );
    if (updatedCart?.modifiedCount > 0 || updatedCart?.upsertedCount > 0) {
      let cartResponse = await getCartItems({ username });
      return {
        status: true,
        message: "Item Removed from Cart Successfully",
        data: cartResponse?.data,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Item Removed from Cart Failed",
    };
  }
};

const getCartItems = async ({ username }) => {
  try {
    let cartItems = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .aggregate([
        {
          $match: {
            username: username,
          },
        },
        {
          $lookup: {
            from: "foods",
            localField: "foodId",
            foreignField: "id",
            as: "food",
          },
        },
        {
          $unwind: {
            path: "$food",
          },
        },
      ])
      .toArray();
    if (cartItems?.length > 0) {
      let itemsTotal = cartItems
        ?.map((cartItem) => cartItem?.food?.price * cartItem?.count)
        ?.reduce((a, b) => parseFloat(a) + parseFloat(b));
      let discount = 0;
      return {
        status: true,
        message: "Cart items fetched Successfully",
        data: {
          cartItems,
          metaData: {
            itemsTotal,
            discount,
            grandTotal: itemsTotal - discount,
          },
        },
      };
    } else {
      return {
        status: false,
        message: "Cart items not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Cart items fetched Failed",
    };
  }
};

const removeCart= async({username})=>{
  try {
    billResponse = await addToBill({username})
    deleteCart = await MongoDB.db
    .collection(mongoConfig.collections.CARTS)
    .deleteMany(
      {'username': username}
    )
      return {
        status: true,
        message: "successfully",
      }
  } catch (error) {
    return {
      status: false,
      message: "fail"
    }
  }
}

module.exports = { addToCart, removeFromCart, getCartItems, removeCart, addToBill,  getBillItems };
