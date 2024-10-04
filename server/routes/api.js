import express  from "express";
import * as UsersController from "../app/controllers/UsersController.js";
import * as AdminController from "../app/controllers/AdminController.js";
import * as TraineesController from "../app/controllers/TraineesController.js";
import * as TrainersController from "../app/controllers/TrainersController.js";
import AuthenticationMiddleware from "../app/middlewares/AuthenticationMiddleware.js";
import {CancelClassBooking} from "../app/controllers/TraineesController.js";
import {AllClassSchedule} from "../app/controllers/AdminController.js";



const router = express.Router();



router.post("/Login", UsersController.Login);
router.post("/Register", UsersController.Register);
router.get("/Logout", UsersController.Logout);


// Admin tasks
router.post("/CreateTrainer", AuthenticationMiddleware, AdminController.CreateTrainer);
router.post("/UpdateTrainer/:trainerID", AuthenticationMiddleware, AdminController.UpdateTrainer);
router.post("/DeleteTrainer/:trainerID", AuthenticationMiddleware, AdminController.DeleteTrainer);
router.get("/GetAllTrainer", AuthenticationMiddleware, AdminController.GetAllTrainer);
router.post("/CreateClassSchedule", AuthenticationMiddleware, AdminController.CreateClassSchedule);
router.get("/AllClassSchedule", AuthenticationMiddleware, AdminController.AllClassSchedule);


// Trainee tasks
router.post("/BookClass/:classID", AuthenticationMiddleware, TraineesController.BookClass);
router.get("/BookedClassSchedules", AuthenticationMiddleware, TraineesController.BookedClassSchedules);
router.get("/AllAvailableClassSchedule", AuthenticationMiddleware, TraineesController.AllAvailableClassSchedule);
router.post("/CancelClassBooking/:classID", AuthenticationMiddleware, TraineesController.CancelClassBooking);
router.get("/Profile", AuthenticationMiddleware, TraineesController.Profile);


// Trainer Tasks
router.get("/GetTrainerAssignedClasses", AuthenticationMiddleware, TrainersController.GetTrainerAssignedClasses);




export default router;