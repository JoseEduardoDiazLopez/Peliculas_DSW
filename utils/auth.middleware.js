const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({error: 'no se encontro el token de acceso'});
    }
    jwt.verify(token, 'secreto', (error, decoded) => {
        if(error){
            return res.status(401).json({error: 'Token inválido.'});
        }
        req.userId = decoded.userId;
        next();
    });
}