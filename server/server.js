const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // for securing the credentials 


dotenv.config({path:'./config.env'});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
//we link the router files to make our Route Easy...
app.use(require('./router/auth'));


const PORT = process.env.PORT || 5000;


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});