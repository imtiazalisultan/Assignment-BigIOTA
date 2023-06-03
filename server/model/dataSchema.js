const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    topup_plan_type:String,
    company_name:String,
    employee_mobile_no:String,
    employee_code:String,
    work_email: String,
    grade_carde:String,
    employee_type:String,
    employee_name:String,
    designation:String,
    doj_organization:String,
    work_location:String,
    dependends:Number,
    created_at: {
     type: Date,
     default: Date.now(),
    },
    updated_at:{
     type: Date,
     default: Date.now(),
    },
 
  });


const Data = mongoose.model('Data', dataSchema);
module.exports = Data;