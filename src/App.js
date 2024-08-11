import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CustomerForm from './Components/customerForm';
import TransactionForm from './Components/transactionForm';
import TransactionReport from './Components/transactionReports';
import CustomerDetails from './Components/customerDetails';
import { BASE_URL } from './Contants/constants';

function App() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/CFPContrller/GetAllCustomers`);
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
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Customer Balance Platform</h1>
      </header>

      <main className="p-8">
        <section className="mb-8">
          <div className="flex space-x-4">
            <div className="w-1/2">
            <CustomerDetails customers={customers} fetchCustomers={fetchCustomers} />

            </div>
            <div className="w-1/2">
            <CustomerForm fetchCustomers={fetchCustomers} />

            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
          <TransactionForm customers={customers} fetchTransactions={fetchCustomers} />

          </div>
          <div className="col-span-1">
            <TransactionReport customers={customers} />
          </div>
        </section>
      </main>
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
