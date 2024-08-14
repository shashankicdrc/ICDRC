import adminModel from '#models/adminModel';
import adminTokenModel from '#models/adminTokenModel';

class AdminService {
    constructor() {}

    async updateAdminAndDeleteToken(adminId, tokenId, hashedPassword) {
        const updatedAdmin = await adminModel
            .findByIdAndUpdate(
                adminId,
                { password: hashedPassword },
                { new: true },
            )
            .select({ _id: 1 });

        const deletedToken = await adminTokenModel
            .findOneAndDelete({
                _id: tokenId,
                adminId,
            })
            .select({ _id: 1 });

        if (updatedAdmin && deletedToken) {
            return { updatedAdmin, deletedToken };
        }
        return null;
    }

    async deletePasswordToken(id) {
        const isDeleted = await adminTokenModel.findByIdAndDelete(id);
        return isDeleted ? { deleted: true } : { deleted: false };
    }
    async addPasswordToken(data) {
        const addToken = await adminTokenModel.create(data);
        return addToken ?? undefined;
    }

    async isPasswordTokenExist(adminId) {
        const isToken = await adminTokenModel.findOne({ adminId });
        return isToken ?? undefined;
    }

    async updatePassword(adminId, hashedPassword) {
        const updatePwd = await adminModel.findByIdAndUpdate(
            adminId,
            { password: hashedPassword },
            { new: true },
        );
        return !updatePwd ? { updated: false } : { updated: true };
    }

    async isAdminExistByEmail(email, showPassword = false) {
        const projection = showPassword ? '' : '-password';
        const isExist = await adminModel.findOne({ email }).select(projection);
        return isExist ?? undefined;
    }

    async isAdminExistById(id, showPassword = false) {
        const projection = showPassword ? { password: 1 } : { password: 0 };
        const isExist = await adminModel.findById(id).select(projection);
        return isExist ?? undefined;
    }

    async addNewAdmin(data) {
        const createAdmin = await adminModel.create(data);
        return { email: createAdmin.email };
    }
}

export default AdminService;
