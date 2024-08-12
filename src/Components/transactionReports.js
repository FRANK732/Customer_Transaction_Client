import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Contants/constants";
import { format } from "date-fns";

const TransactionReport = ({ customers }) => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    customerId: 0,
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const fetchReport = async (e) => {
    e.preventDefault();
    const { customerId, startDate, endDate } = filter;
    const url = `${BASE_URL}/CFPContrller/GenerateTransactionReport?customerId=${customerId}&startDate=${startDate}&endDate=${endDate}`;
    const response = await axios.get(url);
    setTransactions(response.data.transactions);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Transaction Report</h2>
      <form onSubmit={fetchReport} className="flex gap-4 mb-4">
        <div>
          <h3 className="text-xl mb-4">Customers</h3>
          <select
            name="customerId"
            value={filter.customerId}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Customers</option>
            {customers.map((customer) => (
              <option key={customer.customerID} value={customer.customerID}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xl mb-4">Start Date</h3>
          <input
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <h3 className="text-xl mb-4">End Date</h3>
          <input
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-900"
        >
          Get Report
        </button>
      </form>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-200">Date</th>
            <th className="border p-2 bg-gray-200">Transaction ID</th>
            <th className="border p-2 bg-gray-200">Type</th>
            <th className="border p-2 bg-gray-200">Remarks</th>
            <th className="border p-2 bg-gray-200">Debit</th>
            <th className="border p-2 bg-gray-200">Credit</th>
            <th className="border p-2 bg-gray-200">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.uniqueNumber} className="border-t">
              <td className="border p-2">
                {format(
                  new Date(transaction.transactionDate),
                  "yyyy-MM-dd HH:mm:ss"
                )}
              </td>
              <td className="border p-2">{transaction.uniqueNumber}</td>
              <td className="border p-2">{transaction.transactionType}</td>
              <td className="border p-2">{transaction.remarks}</td>
              <td className="border p-2">{transaction.debit}</td>
              <td className="border p-2">{transaction.credit}</td>
              <td className="border p-2">{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionReport;
