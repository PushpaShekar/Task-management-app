const Employee = require("../models/employee")
const employeeValidationSchema = {
   userId:{
      custom: {
         options: async function(value, {req}){
            const employee = await Employee.findOne({ userId: req.user.id })
            if(employee) {
               throw new Error("Profile already created")
            } else {
               return true
            }
         }
      }
   },
   firstName: {
      in: ["body"],
      exists: {
         errorMessage: "firstName is required"
      },
      notEmpty: {
         errorMessage: "firstName is cannot be empty"
      },
      trim: true
   },
   lastName: {
      in: ["body"],
      exists: {
         errorMessage: "lastName is required"
      },
      notEmpty: {
         errorMessage: "lastName is cannot be empty"
      },
      trim: true
   },
   mobile: {
      in: ["body"],
      exists: {
         errorMessage: "mobile is required"
      },
      notEmpty: {
         errorMessage: "mobile cannot be empty"
      },      
      isLength:{
         options:{min:10, max:10},
         errorMessage: "mobile should be 10 digits"
      },
      isNumeric: {
         errorMessage: "Mobile should be a number"
      },
      custom: {
         options: async function(value){
            const employee =await Employee.findOne({mobile: value})
            if(employee){
               throw new Error("mobile already exists")
            }
         }
      },
      trim: true
   },
   address: {
      in: ["body"],
      exists: {
         errorMessage: "mobile is required"
      },
      notEmpty: {
         errorMessage: "mobile cannot be empty"
      }, 
      trim: true
   }
}


module.exports = employeeValidationSchema