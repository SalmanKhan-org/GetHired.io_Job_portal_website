import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Company from "../../models/companyModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
import bcrypt from 'bcryptjs';
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary.js";
import { generateToken } from "../../utils/generateToken.js";

export const registerCompany = catchAsyncErrors(
    async (req, res, next) => {
        const { name, email, password } = req.body;


        const file = req.file;
        if (!file || !name || !email || !password) {
            return next(new ErrorHandler("Missing details",403))
        }

        const isCompanyExist = await Company.findOne({ email });
        if (isCompanyExist) {
            return next(new ErrorHandler("Company Already Exist"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await uploadOnCloudinary(file);

        const company = await Company.create({
            name, email, password: hashPassword, image: imageUpload
        });

        res.status(200).json({
            success: true,
            message: 'Company Created',
            company,
            token: generateToken(company._id)
        })
    }
)