import TrainersModel from "../models/TrainersModel.js";
import bcrypt from "bcrypt";
import UsersModel from "../models/UsersModel.js";

export const CreateTrainerService = async (req) => {
    try {
        if (req.headers.role !== "admin") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }
            const { name, email, password } = req.body;

            const existingTrainer = await UsersModel.findOne({ email });
            if (existingTrainer) {
                return { statusCode: 409, status: "Failed", message: "Trainer with this email already exists" };
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newTrainerUser = await UsersModel.create({
                name,
                email,
                password: hashedPassword,
                role: "trainer"
            });

            await TrainersModel.create({ userId: newTrainerUser._id });


            return { statusCode: 201, status: "Success", message: "Trainer created successfully" };


    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.message };
    }
};


export const UpdateTrainerService = async (req) => {
    try {
        if (req.headers.role !== "admin") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }
            const { trainerID } = req.params;
            const updateData = req.body;

            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            let updatedTrainer = await UsersModel.updateOne(
                { _id: trainerID },
                { $set: updateData },
                { upsert: false }
            );

            if (updatedTrainer.matchedCount === 0) {
                return { statusCode: 404, status: "Failed", message: "Trainer not found" };
            }

            return { statusCode: 200, status: "Success", message: "Trainer updated successfully", data: updatedTrainer };


    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};


export const DeleteTrainerService = async (req) => {
    try {
        if (req.headers.role !== "admin") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }
            const { trainerID } = req.params;

            let deletedTrainer = await UsersModel.deleteOne({ _id: trainerID });


            if (deletedTrainer.deletedCount === 0) {
                return { statusCode: 404, status: "Failed", message: "Trainer not found" };
            }

            await TrainersModel.deleteOne({ userId: trainerID });

            return { statusCode: 200, status: "Success", message: "Trainer deleted successfully" };


    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};


export const GetAllTrainerService = async (req) => {
    try {
        const trainers = await UsersModel.find({role: "trainer"});

        if (trainers.length === 0) {
            return { statusCode: 404, status: "Failed", message: "No trainers found." };
        }

        return { statusCode: 200, status: "Success", data: trainers };
    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.message || "Internal server error." };
    }
};


