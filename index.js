require("dotenv").config()
const express = require("express")
const {checkSchema} = require("express-validator")

const configureDB = require("./config/db")

const userRegValidationSchema = require("./app/validations/user-reg-validations")
const userLoginValidationSchema = require("./app/validations/user-login-validations")
const employeeValidationSchema = require("./app/validations/emp-validations")

const usersCntr = require("./app/controllers/users-cntr")
const tasksCntr = require("./app/controllers/tasks-cntr")
const employeesCntr = require("./app/controllers/employees-cntr")

const authenUser = require("./app/middlewares/authenUser")
const authorUser = require("./app/middlewares/authorUser")


const app = express()
const port = 3700

configureDB()

app.use(express.json())

app.post("/users/reg", checkSchema(userRegValidationSchema), usersCntr.register)

app.post("/users/login", checkSchema(userLoginValidationSchema),usersCntr.login )

//routing level middleware
app.get("/users/acc", authenUser, usersCntr.account)

app.get("api/tasks", authenUser , tasksCntr.list)
app.post("/api/tasks", authenUser ,authorUser(["TeamLead"]), checkSchema(employeeValidationSchema),tasksCntr.create )

//employee - create, show and update
app.post("api/employee/create",authenUser, authorUser(["Employee"]), employeesCntr.create)
app.get("api/employee/show", employeesCntr.show)
app.put("api/employee/update", employeesCntr.update)

app.listen(port, () => {
   console.log("server running on port", port)
})