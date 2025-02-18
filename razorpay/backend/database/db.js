import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect('mongodb+srv://ganeshcoursera1122:gans123@cluster1.aboed0e.mongodb.net/razorpay');
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;