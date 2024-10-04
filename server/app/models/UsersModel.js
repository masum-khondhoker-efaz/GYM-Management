import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "trainer", "trainee"], default: "trainee" },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const UsersModel = mongoose.model('users', UsersSchema);

export default UsersModel;
