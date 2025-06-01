const mongoose = require("mongoose");

const connectDb = async (uri) => {
  try {
    const response = await mongoose.connect(uri);
    console.log(`DB connected: `, response.connection.host);
  } catch (error) {
    console.log(`Error connecting database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
