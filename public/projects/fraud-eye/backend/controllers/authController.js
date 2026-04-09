import { asyncHandler } from "../utils/Constructors/asyncHandler.js";
import { ApiError } from "../utils/Constructors/ApiError.js";
import { ApiResponse } from "../utils/Constructors/ApiResponse.js";
import authServices from "../services/authServices.js";

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken } = await authServices.loginUser(email, password);

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                { user, accessToken },
                "User logged in successfully bhai"
            )
        );
});

export { loginUser };
