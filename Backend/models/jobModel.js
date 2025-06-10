import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobModel = new Schema({
    title: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    }
})