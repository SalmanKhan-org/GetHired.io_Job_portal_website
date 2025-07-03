import mongoose from "mongoose";
const Schema = mongoose.Schema;

const companyModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    password: { type: String, required: true }
})

const Company = mongoose.model('Company', companyModel);

export default Company;