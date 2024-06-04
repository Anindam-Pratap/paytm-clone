const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config")


function authMiddleware(req,res,next){
    const auth = req.headers.authorization
    const token = auth.split(' ')[1]

    if(!auth || auth.startsWith('bearer ')){
        return res.status(403).json({})
    }
    
    try {
        const decoded = jwt.verify(token,JWT_SECRET)

    if (decoded.userId){
        req.userId = decoded.userId
        next()
    }
        
    } catch (error) {
        res.status(403).json({})
    }
    
}


module.exports = {
    authMiddleware
}