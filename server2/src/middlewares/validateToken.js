import jwt from 'jsonwebtoken';
export const TOKEN_SECRET = process.env.TOKEN_SECRET

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({message: 'No Token Authorization denied'});
    }
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = user
        next();
    })
    
}