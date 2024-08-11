import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Contants/constants';
import { Toaster, toast } from 'sonner'



const TransactionForm = ({ customers, fetchTransactions }) => {
    const [transaction, setTransaction] = useState({ customerId: '', transactionType: '', amount: '', remarks: '' });

    const paymentType = [
        {key:0, value:"Invoice"},
        {key: 1, value: "Payment"}
    ]

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'remarks') {
            setTransaction({ ...transaction, [name]: value });

        } else {
            setTransaction({ ...transaction, [name]: parseInt(value) });

        }  
        
        // switch (name) {
        //     case "customerId":
        //         setTransaction({ ...transaction, [name]: parseInt(value) });
        //         break;

        //     case "transactionType":
        //         setTransaction({ ...transaction, [name]: parseInt(value) });
        //         break;
        
        //     default:
        //         setTransaction({ ...transaction, [name]: value });
        //         break;
        // }
    
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/CFPContrller/CreateTransaction`, transaction);
            setTransaction({ customerId: '', transactionType: '', amount: '', remarks: '' });
            fetchTransactions();
            toast.success('Transaction created succesfully 😏')
        } catch (error) {
            toast.error("Failed to Create Transaction. Try Again ")
        }
       
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Record Transaction</h2>
            <select 
                name="customerId" 
                value={transaction.customerId} 
                onChange={handleInputChange} 
                required 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
                <option value="">Select Customer</option>
                {Array.isArray(customers) && customers.length > 0 && customers.map(customer => (
                    <option key={customer.customerID} value={customer.customerID}>{customer.name}</option>
                ))}
            </select>
            <select 
                name="transactionType" 
                value={transaction.transactionType} 
                onChange={handleInputChange} 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
                                <option value="">Select Payment Type</option>

                {paymentType.map(paymentType => (

                <option key={paymentType.key} value={paymentType.key}>{paymentType.value}</option>
            ))}
                {/* <option value="invoice">Invoice</option>
                <option value="payment">Payment</option> */}
            </select>
            <input 
                type="number" 
                name="amount" 
                placeholder="Amount" 
                value={transaction.amount} 
                onChange={handleInputChange} 
                required 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input 
                type="text" 
                name="remarks" 
                placeholder="Remarks" 
                value={transaction.remarks} 
                disabled={loading}
                onChange={handleInputChange} 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                {loading ? 'Adding...':'Add Transaction'}
            </button>
            <Toaster position='top-right' richColors/>

        </form>
    );
};

export default TransactionForm;
