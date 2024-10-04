import mongoose from "mongoose";

const ClassScheduleSchema = new mongoose.Schema({
    classDate: { type: String, required: true, get: (v) => v },
    startTime: { type: String, required: true,
        validate: {
            validator: function(value) {
                return /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(value);
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    endTime: {
        type: String,
        default: function() {
            const startDateTimeString = `${this.classDate} ${this.startTime}`;
            const start = new Date(startDateTimeString);

            if (isNaN(start.getTime())) {
                return "Invalid";
            }

            const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

            const endTimeString = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            return endTimeString;
        }
    },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'trainers', required: true },
    trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trainees' }],
    maxTrainees: { type: String, default: "10" }
}, {
    timestamps: true,
    versionKey: false
});

const ClassScheduleModel = mongoose.model('class-schedules', ClassScheduleSchema);
export default ClassScheduleModel;
