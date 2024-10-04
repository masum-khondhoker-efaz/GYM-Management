import mongoose from 'mongoose';

const TraineeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        age: { type: String },
        phone: { type: String },
        weight: { type: String },
        scheduledClass: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class-schedules' }],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const TraineesModel = mongoose.model('trainees', TraineeSchema);

export default TraineesModel;
