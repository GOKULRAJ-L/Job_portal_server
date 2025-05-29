import jwt from 'jsonwebtoken'

const generatToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
}

export default generatToken