import ClassScheduleModel from "../models/ClassesScheduleModel.js";
import UsersModel from "../models/UsersModel.js";
import TraineesModel from "../models/TraineesModel.js";
import mongoose from "mongoose";
import convertToDateTime from "../utilities/DateTimeConvertion.js";

export const GetAllClassSchedules = async (req) => {
    try {
        if (req.headers.role !== "trainee") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const userId = req.headers.user_id;


        const userIdObject = new  mongoose.Types.ObjectId(userId);

        const classSchedules = await ClassScheduleModel.aggregate([
            {
                $match: {
                    trainees: userIdObject
                }
            },
            {
                $project: {
                    classDate: 1,
                    startTime: 1,
                    endTime: 1,
                    trainees: 1,
                }
            }
        ]);

        return { statusCode: 200, status: "Success", data: classSchedules };

    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};



export const BookClassService = async (req) => {
    try {
        if (req.headers.role !== "trainee") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const { classID } = req.params;
        const { user_id } = req.headers;

        const traineeExists = await UsersModel.findById(user_id);
        if (!traineeExists) {
            return { statusCode: 404, status: "Failed", message: "Trainee not found" };
        }

        const matchClassSchedule = await ClassScheduleModel.findById(classID);
        if (!matchClassSchedule) {
            return { statusCode: 404, status: "Failed", message: "Class not found" };
        }

        if (matchClassSchedule.trainees.length >= parseInt(matchClassSchedule.maxTrainees, 10)) {
            return { statusCode: 400, status: "Failed", message: "Class is fully booked" };
        }

        const classStartTime = convertToDateTime(matchClassSchedule.classDate, matchClassSchedule.startTime);
        const classEndTime = convertToDateTime(matchClassSchedule.classDate, matchClassSchedule.endTime);

        const overlappingClasses = await ClassScheduleModel.find({
            trainees: user_id,
            classDate: matchClassSchedule.classDate,
            $or: [
                {
                    $and: [
                        { startTime: { $lt: classEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) } },
                        { endTime: { $gt: classStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) } }
                    ]
                }
            ]
        });

        if (overlappingClasses.length > 0) {
            return { statusCode: 400, status: "Failed", message: "You have already booked a class at this time." };
        }

        await ClassScheduleModel.updateOne(
            { _id: classID },
            { $addToSet: { trainees: user_id } }
        );

        await TraineesModel.updateOne(
            { userId: user_id },
            { $addToSet: { scheduledClass: classID } } // Ensure it adds to array
        );

        return { statusCode: 200, status: "Success", message: "Trainee booked successfully", data: matchClassSchedule };
    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};


export const CancelClassBookingService = async (req) => {
    try {
        if (req.headers.role !== "trainee") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const { classID } = req.params;
        const { user_id } = req.headers;

        const traineeExists = await UsersModel.findById(user_id);
        if (!traineeExists) {
            return { statusCode: 404, status: "Failed", message: "Trainee not found" };
        }

        const matchClassSchedule = await ClassScheduleModel.findById(classID);
        if (!matchClassSchedule) {
            return { statusCode: 404, status: "Failed", message: "Class not found" };
        }

        if (!matchClassSchedule.trainees.includes(user_id)) {
            return { statusCode: 400, status: "Failed", message: "You are not enrolled in this class." };
        }

        const updatedTrainees = matchClassSchedule.trainees.filter((trainee) => trainee.toString() !== user_id);
        await ClassScheduleModel.updateOne(
            { _id: classID },
            { $set: { trainees: updatedTrainees } }
        );

        const traineeRecord = await TraineesModel.findOne({ userId: user_id });
        const updatedScheduledClass = traineeRecord.scheduledClass.filter((scheduledClass) => scheduledClass.toString() !== classID);
        await TraineesModel.updateOne(
            { userId: user_id },
            { $set: { scheduledClass: updatedScheduledClass } }
        );

        return { statusCode: 200, status: "Success", message: "Booking canceled successfully." };
    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};


export const ProfileService = async (req) => {
    try {
        if (req.headers.role !== "trainee") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const user_id = req.headers.user_id; // Retrieve user_id from headers

        const traineeProfile = await TraineesModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(user_id) // Match the userId
                }
            },
            {
                $lookup: {
                    from: 'users', // The name of the Users collection
                    localField: 'userId', // Field in TraineesModel
                    foreignField: '_id', // Field in UsersModel
                    as: 'userDetails' // The output array field
                }
            },
            {
                $unwind: {
                    path: '$userDetails', // Unwind the userDetails array
                    preserveNullAndEmptyArrays: true // Keep the trainee if there's no matching user
                }
            },
            {
                $project: {
                    name: '$userDetails.name',
                    email: '$userDetails.email',
                    age: '$age',
                    phone: '$phone',
                    weight: '$weight'
                }
            }
        ]);

        if (traineeProfile.length === 0) {
            return { statusCode: 404, status: "Failed", message: "Trainee not found." };
        }

        return { statusCode: 200, status: "Success", data: traineeProfile[0] };
    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.message || "Internal server error." };
    }
};


export const AllAvailableClassSchedulesService = async (req) => {
    try {
        if (req.headers.role !== "trainee") {
            return { statusCode: 401, status: "Failed", message: "Unauthorized" };
        }

        const userId = req.headers.user_id;

        const userIdObject = new  mongoose.Types.ObjectId(userId);

        const availableClasses = await ClassScheduleModel.aggregate([
            {
                $match: {
                    trainees: { $ne: userIdObject }
                }
            },
            {
                $project: {
                    classDate: 1,
                    startTime: 1,
                    endTime: 1,
                    maxTrainees: 1,
                }
            }
        ]);

        return { statusCode: 200, status: "Success", data: availableClasses };

    } catch (error) {
        return { statusCode: 500, status: "Failed", message: error.toString() };
    }
};
