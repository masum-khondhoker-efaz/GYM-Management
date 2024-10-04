import mongoose from 'mongoose';

const TrainersSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        classAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class-schedules' }],

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const TrainersModel = mongoose.model('trainers', TrainersSchema);

export default TrainersModel;
