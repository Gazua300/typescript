const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const { config } = require('dotenv')

config()


class Authentication{
    generateId = ()=>{
        return v4()
    }

    hash = (text:string)=>{
        const rounds = 12
        const salt = bcrypt.genSaltSync(rounds)
        const cypher = bcrypt.hashSync(text, salt)

        return cypher
    }

    compare = (text:string, hash:string)=>{
        return bcrypt.compareSync(text, hash)
    }

    token = (payload:string)=>{
        return jwt.sign(
            { payload },
            process.env.JWT_KEY,
            { expiresIn: '1h'}
        )
    }

    tokenData = (token:string)=>{
        return jwt.verify(
            token,
            process.env.JWT_KEY
        )
    }
}

module.exports = Authentication
