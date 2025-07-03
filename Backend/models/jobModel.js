import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobModel = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    date: { type: Number, required: true },
    visible: { type: Boolean, default:true },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required:true
    }
})

const Job = mongoose.model('Job', jobModel);

export default Job;