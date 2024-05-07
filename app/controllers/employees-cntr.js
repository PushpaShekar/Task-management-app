const Employee = require("../models/employee")
const employeesCntr = {}

employeesCntr.create = async (req, res) => {
   res.send("create employee profile")

}

employeesCntr.show = async (req, res) => {
   res.send("show employee profile")

}

employeesCntr.update = async (req, res) => {
   res.send("update employee profile")

}


module.exports = employeesCntr