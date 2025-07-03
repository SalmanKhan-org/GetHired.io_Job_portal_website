import jwt from "jsonwebtoken";
import Company from "../models/companyModel.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return next(new ErrorHandler('Please Login to Access', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.company = await Company.findById(decoded.id).select("-password");

    next();
}