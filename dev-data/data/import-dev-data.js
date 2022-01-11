const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const Tour = require('../../model/tours/tours');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

// Reading JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data to database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Uploaded tours successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted all tours');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
