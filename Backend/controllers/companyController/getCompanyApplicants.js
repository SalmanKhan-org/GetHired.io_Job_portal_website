import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import Application from "../../models/applicationModel.js";
import mongoose from "mongoose";

export const getCompanyApplicants = catchAsyncErrors(
    async (req, res, next) => {
        const companyId = req?.company._id;

        const applications = await Application.aggregate([
            {
                $match: { company: new mongoose.Types.ObjectId(companyId) }
            },
            {
                $lookup: {
                    from: 'users',           // MongoDB collection name for users
                    localField: 'user',      // string in Application schema
                    foreignField: '_id', // string field in User schema
                    as: 'userData'
                }
            },
            {
                $unwind: '$userData'
            },
            {
                $lookup: {
                    from: 'jobs',
                    localField: 'job',
                    foreignField: '_id',
                    as: 'jobData'
                }
            },
            {
                $unwind: '$jobData'
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    user: '$userData',      // contains populated user info
                    job: '$jobData'         // contains populated job info
                }
            }
        ]);
          
        res.status(200).json({
            success: true,
            applications
        })
    }
)