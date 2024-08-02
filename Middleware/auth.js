const auth = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
module.exports = auth