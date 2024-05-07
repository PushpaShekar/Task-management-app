const tasksCntr = {}
tasksCntr.list = async (req, res) => {
   res.send("Listening")
}

tasksCntr.create = async (req, res) => {
   res.send("created a task")
}

module.exports = tasksCntr