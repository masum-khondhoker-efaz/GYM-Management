import ClassScheduleModel from "../models/ClassesScheduleModel.js";
import TrainersModel from "../models/TrainersModel.js";
import UsersModel from "../models/UsersModel.js";

export const CreateClassScheduleService = async (req) => {
    try {
        if (req.headers.role !== "admin") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const { classDate, startTime, trainerID } = req.body;

        let trainerExists = await UsersModel.findOne({ _id: trainerID });
        if (!trainerExists) {
            return { statusCode: 404, status: "Failed", message: "Trainer not found" };
        }

        const classCount = await ClassScheduleModel.find({ classDate }).countDocuments();
        if (classCount >= 5) {
            return { statusCode: 400, status: "Failed", message: "Class limit for the day reached" };
        }

        const newClassSchedule = await ClassScheduleModel.create({
            classDate,
            startTime,
            trainerId: trainerID
        });

        await TrainersModel.updateOne(
            { userId: trainerID },
            { $addToSet: { classAssigned: newClassSchedule._id } }
        );

        return { statusCode: 201, status: "Success", message: "Class scheduled successfully", data: newClassSchedule };

    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};



export const AllClassScheduleService = async (req) => {
    try {
        const classSchedules = await ClassScheduleModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'trainerId',
                    foreignField: '_id',
                    as: 'trainer'
                }
            },
            {
                $unwind: {
                    path: '$trainer',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    classDate: 1,
                    startTime: 1,
                    endTime: 1,
                    trainerName: { $ifNull: ['$trainer.name', null] },
                    traineeCount: { $size: '$trainees' }
                }
            }
        ]);

        if (classSchedules.length === 0) {
            return { statusCode: 404, status: "Failed", message: "No class schedules found." };
        }

        return { statusCode: 200, status: "Success", data: classSchedules };
    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.message || "Internal server error." };
    }
};



