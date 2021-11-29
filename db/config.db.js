const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS);
    console.log("CONECCTION.....");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
