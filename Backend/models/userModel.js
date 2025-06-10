import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userModel = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume: { type: String },
    image: {type: String, required: true}
})

const User = mongoose.model('User', userModel);

export default User;