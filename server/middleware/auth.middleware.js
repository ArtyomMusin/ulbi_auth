const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token.service')

module.exports = function (req, res, next) {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorization.split('=')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.accessIsValid(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        ApiError.UnauthorizedError()
    }
}