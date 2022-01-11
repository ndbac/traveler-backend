const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const dbConnect = require('./database/dbConnect');

//Connect database
dbConnect();

//Server running
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
