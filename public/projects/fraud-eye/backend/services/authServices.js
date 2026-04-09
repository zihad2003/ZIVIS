import { User } from "../modals/User.js";
import { ApiError } from "../utils/Constructors/ApiError.js";

class AuthServices {
    async loginUser(email, password) {
        if (!email || !password) {
            throw new ApiError(400, "Email and password are required bhai");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User does not exist bhai");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials bhai");
        }

        const accessToken = user.generateAccessToken();

        const loggedInUser = await User.findById(user._id).select("-password");

        return { user: loggedInUser, accessToken };
    }

    async seedAdmin() {
        const adminEmail = "admin@admin.com";
        const adminPassword = "admin@rift";

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            await User.create({
                email: adminEmail,
                password: adminPassword,
                role: "admin"
            });
            console.log("Admin seeded successfully bhai");
        }
    }
}

export default new AuthServices();
