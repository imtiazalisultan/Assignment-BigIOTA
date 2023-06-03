const mongoose = require('mongoose');
const db = process.env.DATABASE;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log(`MongoDB connection successfull :)`))
.catch((err)=>console.log(`MongoDB connection is not Successfull :( `,err))