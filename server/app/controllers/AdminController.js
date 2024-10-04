import {
    CreateTrainerService,
    DeleteTrainerService,
    GetAllTrainerService,
    UpdateTrainerService
} from "../service/AdminService.js";
import {AllClassScheduleService, CreateClassScheduleService} from "../service/ClassesScheduleService.js";


export const CreateTrainer = async (req, res) => {
    let result = await CreateTrainerService(req);
    return res.status(result.statusCode).json(result);
}

export const UpdateTrainer = async (req, res) => {
    let result = await UpdateTrainerService(req);
    return res.status(result.statusCode).json(result);
}

export const DeleteTrainer = async (req, res) => {
    let result = await DeleteTrainerService(req);
    return res.status(result.statusCode).json(result);
}

export const GetAllTrainer = async (req, res) => {
    let result = await GetAllTrainerService(req);
    return res.status(result.statusCode).json(result);
}


export const CreateClassSchedule = async (req, res) => {
    let result = await CreateClassScheduleService(req);
    return res.status(result.statusCode).json(result);
};

export const AllClassSchedule = async (req, res) => {
    let result = await AllClassScheduleService(req);
    return res.status(result.statusCode).json(result);
};


