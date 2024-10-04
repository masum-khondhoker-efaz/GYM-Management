import {
    AllAvailableClassSchedulesService,
    BookClassService,
    CancelClassBookingService,
    GetAllClassSchedules, ProfileService
} from "../service/TraineesService.js";



export const BookedClassSchedules = async (req, res) => {
    const result = await GetAllClassSchedules(req);
    return res.status(result.statusCode).json(result);
};

export const BookClass = async (req, res) => {
    let result = await BookClassService(req);
    return res.status(result.statusCode).json(result);
};

export const AllAvailableClassSchedule = async (req, res) => {
    let result = await AllAvailableClassSchedulesService(req);
    return res.status(result.statusCode).json(result);
};

export const CancelClassBooking = async (req, res) => {
    let result = await CancelClassBookingService(req);
    return res.status(result.statusCode).json(result);
};

export const Profile = async (req, res) => {
    let result = await ProfileService(req);
    return res.status(result.statusCode).json(result);
};

