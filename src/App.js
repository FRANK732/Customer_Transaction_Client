import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CustomerForm from './Components/customerForm';
import TransactionForm from './Components/transactionForm';
import TransactionReport from './Components/transactionReports';
import CustomerList from './Components/customerList';
import { BASE_URL } from './Contants/constants';

function App() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/CFPContrller/GetAllCustomers`);
        console.log(response.data); 
        setCustomers(response.data);
    } catch (error) {
        console.error('Error fetching customers:', error);
        setCustomers([]); 
    }
};

  useEffect(() => {
      fetchCustomers();
  }, []);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Customer Balance Platform</h1>
      <div className="flex space-x-4">
        <div className="w-1/2">
            <CustomerForm fetchCustomers={fetchCustomers} />
            </div>
            <div className="w-1/2">
            <TransactionForm customers={customers} fetchTransactions={fetchCustomers} />
            </div>
</div>

            <CustomerList customers={customers} />
            <TransactionReport customers={customers} />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
