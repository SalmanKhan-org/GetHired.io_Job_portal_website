import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Company from "../../models/companyModel.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";

export const login = catchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body;

        console.log(req.body);

        const company = await Company.findOne({ email });

        if (!company) {
            return next(new ErrorHandler("Account Does not Exist", 404));
        }

        const isPassMatch = await bcrypt.compare(password, company.password);

        if (!isPassMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 403));
        }

        res.status(200).json({
            success: true,
            company,
            message:"Logged in Successfully",
            token: generateToken(company._id)
        })
    }
)