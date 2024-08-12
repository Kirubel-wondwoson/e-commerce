const jwt = require("jsonwebtoken")

authenticateTokenRole = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) res.sendStatus(401) 

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403) 
    req.user = user
    if (req.user.role !== "Admin" && req.user._id !== req.params.id) {
      return res.sendStatus(403)
    }
    next()
  })
}

module.exports = authenticateTokenRole