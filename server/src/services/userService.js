import userModel from "#models/userModel";

class UserService {
    constructor() {
    }

    async isUserExistByEmail(email, showPassword = false) {
        const projection = showPassword ? '' : '-password';
        const isExist = await userModel.findOne({ email }).select(projection)
        return isExist ?? undefined;
    }

    async isUserExistById(id, showPassword = false) {
        const projection = showPassword ? { password: 1 } : { password: 0 };
        const isExist = await userModel.findById(id).select(projection);
        return isExist ?? undefined
    }

    async addNewUser(data) {
        const createUser = await userModel.create(data);
        return { email: createUser.email }
    }
}

export default UserService;
