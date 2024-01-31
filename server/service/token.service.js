const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService {
    generate (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken (userId, refreshToken) {
        try {
            const tokenData = await tokenModel.findOne({ user: userId })
            if (tokenData) {
                tokenData.refreshToken = refreshToken
                tokenData.save()
                return tokenData
            }
            return await tokenModel.create({ user: userId, refreshToken })
        } catch (e) {
            console.log(e.message)
        }
    }

    async removeToken (refreshToken) {
        await tokenModel.deleteOne({ refreshToken })
    }

    accessIsValid (token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS)
        } catch (e) {
            return null
        }
    }

    refreshIsValid (token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH)
        } catch (e) {
            return null
        }
    }

    async findToken (token) {
        return tokenModel.findOne({ token })
    }
}

module.exports = new TokenService()
