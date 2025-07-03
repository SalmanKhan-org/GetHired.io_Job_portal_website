import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicationModel = new Schema({
    user: {
        type: String,
        required:true
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required:true
    },

    job: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job',
        required:true
    },
    status: { type: String, default: 'Pending' },
    date: {type:Number, required:true}
})

const Application = mongoose.model('Application', applicationModel);
export default Application;