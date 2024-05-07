const User = require("../models/user")
const userRegValidationSchema = {
   username: {
      notEmpty: {
         errorMessage: "username is required"
      },
      custom: {
         options: async function(value){
            const user = await User.findOne({username: value})
            if(user){
               throw new Error("Username already taken")
            }else{
               return true
            }
         }
      }, 
      trim: true
   },
   email: {
      notEmpty: {
         errorMessage: "email is required"
      },
      isEmail:{
         errorMessage: "email should be a valid format"
      },
      custom: {
         options: async function(value){
            const user = await User.findOne({ email: value })
            if(user) {
               throw new Error("Email already exists")
            }else {
               return true
            }
         }
      },
      trim: true,
      normalizeEmail: true
   },
   password: {
      notEmpty: {
         errorMessage: "password is required"
      },
      isLength:{
         options:{min: 8, max:128},
         errorMessage: "password should be between 8-128 characters"
      }, 
      trim: true
   },
   role: {
      in: ["body"],
      exists: {
         errorMessage: "Role is required"
      },
      notEmpty: {
         errorMessage: "role is cannot be empty"
      },
      isIn: {
         options: [["TeamLead", "Employee"]],
         errorMessage: "Role should be a TeamLead or an Employee"
      }
   }
}

module.exports = userRegValidationSchema