import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        adminLevel: { type: String, enum: ['Super Admin', 'Admin'], default: 'Admin'}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const AdminModel = mongoose.model('admins', AdminSchema);

export default AdminModel;
