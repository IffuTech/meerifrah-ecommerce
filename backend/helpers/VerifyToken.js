var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ 'status': false, 'errorMessage':'No token provided' });
    
  jwt.verify(token, 'secretKey', function(err, decoded) {
    if (err)
    return res.status(500).send({ 'status': false, 'errorMessage':'Failed to authenticate token'});
     // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    req.email = decoded.email;
    req.userType = decoded.userType;
    req.name=decoded.name;

    next();
  });
}

module.exports = verifyToken;