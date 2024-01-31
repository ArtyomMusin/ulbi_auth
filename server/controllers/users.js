const userService = require('../service/user.service')
const ApiError = require('../exceptions/api-error')
const UserDto = require('../dtos/user-dto')

class UserController {
    async getUsers (req, res, next) {
        try {
            const users = await userService.getAllUsers()
            res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUserById (req, res, next) {
        try {
            const { id } = req.params
            if (id !== req.user.id) {
                return next(ApiError.UnauthorizedError())
            }
            const user = await userService.getUserById(id)
            res.json(new UserDto(user))
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()