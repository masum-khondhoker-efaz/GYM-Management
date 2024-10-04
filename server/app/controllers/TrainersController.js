import {GetAssignedClasses} from "../service/TrainersService.js";

export const GetTrainerAssignedClasses = async (req, res) => {
    const response = await GetAssignedClasses(req);
    res.status(response.statusCode).json(response);
};