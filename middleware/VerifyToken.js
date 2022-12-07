import jwt, { decode } from 'jsonwebtoken'


export const VerifyToken = (req,res,next) =>{
    const accessToken = req.cookies.accessToken
    if(!accessToken) return res.setStatus(401);

    jwt.verify(accessToken,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return res.sendStatus(401)
        const userId = decoded.userId;
        const email = decoded.email

        console.log('verify=> ', email, userId);

        next()
    })
}