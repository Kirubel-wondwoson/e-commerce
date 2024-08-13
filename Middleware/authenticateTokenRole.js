const jwt = require("jsonwebtoken")

authenticateTokenRole = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
    
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = decoded.user
    req.locals.id = user.id  
    req.user = user
    next()
  } catch (error) {
    res.sendStatus(403)
  }

}

module.exports = authenticateTokenRole