import { asyncHandler } from "../utils/Constructors/asyncHandler.js";
import { ApiError } from "../utils/Constructors/ApiError.js";
import { ApiResponse } from "../utils/Constructors/ApiResponse.js";
import { analyzeTransactions } from "../services/analysis.service.js";

const processCSVData = asyncHandler(async (req, res) => {
    const { transactions } = req.body;
    console.log("Received transactions for analysis, count:", transactions?.length);

    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        console.error("Analysis Error: Invalid or empty transactions data");
        throw new ApiError(400, "Invalid or empty transactions data");
    }

    try {
        const startTime = Date.now();
        const analysisResult = await analyzeTransactions(transactions);
        const endTime = Date.now();

        analysisResult.summary.processing_time_seconds = (endTime - startTime) / 1000;

        console.log("Analysis successful, results found:", analysisResult.suspicious_accounts?.length);
        return res
            .status(200)
            .json(new ApiResponse(200, analysisResult, "Transactions analyzed successfully"));
    } catch (error) {
        console.error("Analysis Execution Error:", error);
        throw new ApiError(500, error.message || "Internal Server Error during analysis");
    }
});

export { processCSVData };
