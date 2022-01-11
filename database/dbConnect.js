const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
    });
    console.log('Db is connected');
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = dbConnect;
