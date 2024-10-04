import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {DATABASE_URL} from "./app/config/config.js";
import UsersModel from "./app/models/UsersModel.js";
import AdminModel from "./app/models/AdminModel.js";

const createAdmin = async () => {
    try {
        await mongoose.connect(DATABASE_URL, { autoIndex: true });

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash('1234', 10);  // '1234' is the plain text password

        // Creating the admin in the UsersModel
        const adminUser = await UsersModel.create({
            name: 'Admin',
            email: 'admin1@example.com',
            password: hashedPassword,
            role: 'admin',
        });

        const adminData = await AdminModel.create({
            userId: adminUser._id,
            adminLevel: 'Super Admin',
        });


        console.log('Admin user created');
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin:', error);
        await mongoose.connection.close();
    }
};

createAdmin();
