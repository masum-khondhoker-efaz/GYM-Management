import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utilities/TokenUtility.js";
import bcrypt from "bcrypt";
import TraineesModel from "../models/TraineesModel.js";


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|info|bd|co|io|ai)$/;

export const RegisterService = async (req) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return { statusCode: 400, status: "Failed", message: "All fields are required." };
        }

        if (!emailRegex.test(email)) {
            return { statusCode: 400, status: "Failed", message: "Invalid email format." };
        }

        const existingUser = await UsersModel.findOne({ email });
        if (existingUser) {
            return { statusCode: 409, status: "Failed", message: "Email already exists." };
        }

        const traineeUser = await UsersModel.create({
            name,
            email: email,
            password: await bcrypt.hash(password, 10),
            role: "trainee"
        });


        await TraineesModel.create({
            userId: traineeUser._id,
            age: "",
            phone: "",
            image: ""
        });

        return { statusCode: 201, status: "Success", message: "User registered successfully." };
    } catch (error) {
        if (error.name === 'ValidationError') {
            return { statusCode: 400, status: "Failed", message: error.message };
        }
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};



export const LoginService = async (req) => {
    try {
        let { email, password } = req.body;

        let data = await UsersModel.aggregate([
            { $match: { email } },
            { $project: { _id: 1, password: 1, email: 1, role: 1 } }
        ]);

        if (data.length === 0) {
            return {
                statusCode: 404, status: "Failed", message: "User not found"
            };
        }

        let passwordCompared = await bcrypt.compare(password, data[0]['password']);
        if (!passwordCompared) {
            return {
                statusCode: 401, status: "Failed", message: "Unauthorized"
            };
        }

        let token = TokenEncode(data[0]['email'], data[0]['role'], data[0]['_id']);

        return { statusCode: 200, status: "Success", message: "User Login Successfully",
            data: { token: token, role: data[0]['role'] }
        };

    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};


export const LogoutService = async (res) => {
    try {
        res.clearCookie("Token");
        return { statusCode: 200, status: "Success", message: "User Logout Successfully" };

    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};




