const UserModel = require('../models/user-model')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class AuthService {
    async registration (payload) {
        const { email, password } = payload
        if (!email) {
            throw ApiError.BadRequest(`Email является обязательным`)
        }
        const candidate = await UserModel.findOne({ email })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        await UserModel.create({ email, password: hashPassword, activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/auth/activate/${activationLink}`)
        return await this.login(email, password)
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Invalid activation link')
        }
        user.isActivated = true
        await user.save()
    }

    async login (email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest(`Такой пользователь не зарегистрирован`)
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generate({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout (refreshToken) {
            return await tokenService.removeToken(refreshToken)
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const tokenData = tokenService.refreshIsValid(refreshToken)
        const tokenFromDB = tokenService.findToken(refreshToken)
        if (!tokenData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(tokenData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generate({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
}

module.exports = new AuthService()
