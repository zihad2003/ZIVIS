import axios from 'axios';

const testTransactions = [
  { transaction_id: 'TX_TEST_001', sender_id: 'ACC_ROOT_1', receiver_id: 'ACC_ROOT_2', amount: 500, timestamp: new Date().toISOString() },
  { transaction_id: 'TX_TEST_002', sender_id: 'ACC_ROOT_2', receiver_id: 'ACC_ROOT_3', amount: 500, timestamp: new Date().toISOString() },
  { transaction_id: 'TX_TEST_003', sender_id: 'ACC_ROOT_3', receiver_id: 'ACC_ROOT_1', amount: 500, timestamp: new Date().toISOString() }
];

async function runTest() {
  try {
    console.log("Testing Backend Analysis API...");
    const response = await axios.post('http://localhost:5001/api/v1/analysis/analyze', {
      transactions: testTransactions
    });
    console.log("Response Status:", response.status);
    console.log("Analysis Summary:", JSON.stringify(response.data.data.summary, null, 2));
    console.log("Suspicious Accounts found:", response.data.data.suspicious_accounts.length);
  } catch (error) {
    console.error("Test Failed Bhai:", error.response ? error.response.data : error.message);
  }
}

runTest();
