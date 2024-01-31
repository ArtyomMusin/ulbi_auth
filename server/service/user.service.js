const userModel = require('../models/user-model')

class UserService {
    async getAllUsers () {
        return await userModel.find()
    }

    async getUserById (id) {
        return await userModel.findOne({ _id: id })
    }
}

module.exports = new UserService()
