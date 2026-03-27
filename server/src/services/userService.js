import userModel from '#models/userModel';
import userTokenModel from '#models/userTokenModel';

class UserService {
    constructor() {}

    async updateUserAndDeleteToken(userId, tokenId, hashedPassword) {
        const updatedUser = await userModel
            .findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true },
            )
            .select({ _id: 1 });

        const deletedToken = await userTokenModel
            .findOneAndDelete({
                _id: tokenId,
                userId,
            })
            .select({ _id: 1 });

        if (updatedUser && deletedToken) {
            return { updatedUser, deletedToken };
        }
        return null;
    }

    async deletePasswordToken(id) {
        const isDeleted = await userTokenModel.findByIdAndDelete(id);
        return isDeleted ? { deleted: true } : { deleted: false };
    }
    async addPasswordToken(data) {
        const addToken = await userTokenModel.create({
            type: data?.type ?? 'password_reset',
            ...data,
        });
        return addToken ?? undefined;
    }

    async isPasswordTokenExist(userId, type = 'password_reset') {
        const isToken = await userTokenModel.findOne({ userId, type });
        return isToken ?? undefined;
    }

    async updatePassword(userId, hashedPassword) {
        const updatePwd = await userModel.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true },
        );
        return !updatePwd ? { updated: false } : { updated: true };
    }

    async isUserExistByEmail(email, showPassword = false) {
        const projection = showPassword ? '' : '-password';
        const isExist = await userModel.findOne({ email }).select(projection);
        return isExist ?? undefined;
    }

    async isUserExistById(id, showPassword = false) {
        const projection = showPassword ? { password: 1 } : { password: 0 };
        const isExist = await userModel.findById(id).select(projection);
        return isExist ?? undefined;
    }

    async addNewUser(data) {
        const createUser = await userModel.create(data);
        return { email: createUser.email };
    }
}

export default UserService;
