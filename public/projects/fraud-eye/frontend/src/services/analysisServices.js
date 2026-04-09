import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const analysisService = {
  analyzeTransactions: async (transactions) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/analysis/analyze`, { transactions });
      return response.data;
    } catch (error) {
      console.error("Analysis Error:", error);
      throw error;
    }
  }
};

export default analysisService;
