import ClassScheduleModel from '../models/ClassesScheduleModel.js';
import mongoose from "mongoose";

export const GetAssignedClasses = async (req) => {
    try {
        if (req.headers.role !== "trainer") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const userId = req.headers.user_id;
        const userIdObject = new mongoose.Types.ObjectId(userId);

        const assignedClasses = await ClassScheduleModel.aggregate([
            {
                $match: {
                    trainerId: userIdObject
                }
            },
            {
                $project: {
                    _id: 0,
                    classDate: 1,
                    startTime: 1,
                    endTime: 1,
                    numberOfTrainees: { $size: "$trainees" }
                }
            }
        ]);

        return { statusCode: 200, status: "Success", data: assignedClasses };

    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};
