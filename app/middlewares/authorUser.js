const authorUser = (permittedRoles) => {
   return(req, res, next) => {
      if(permittedRoles.includes(req.user.role)) {
         next()
      } else {
         res.status(403).json({ error: "unauthorized user"})
      }
   }
}


module.exports = authorUser