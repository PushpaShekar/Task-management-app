const mongoose = require("mongoose")
const { Schema, model } = mongoose

const employeeSchema = new Schema ({
   userId: {
      type:Schema.Types.ObjectId,
      ref: "Employee"
   },
   firstName: String,
   lastName: String,
   mobile: String,
   address: String
})

const Employee = model("Employee", employeeSchema)

module.exports = Employee