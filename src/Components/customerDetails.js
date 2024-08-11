import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Contants/constants';
import { Toaster, toast } from 'sonner';

const CustomerDetails = ({ customers, fetchCustomers }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCustomerSelect = async (e) => {
        const customerId = e.target.value;
        if (customerId) {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/CFPContrller/GetCustomerById/${customerId}`);
                setSelectedCustomer(response.data);
            } catch (error) {
                toast.error('Error fetching customer details');
                console.error('Error fetching customer details:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setSelectedCustomer(null);
        }
    };

    const handleDeleteCustomer = async () => {
        if (selectedCustomer) {
            setLoading(true);
            try {
                await axios.delete(`${BASE_URL}/CFPContrller/DeleteCustomer/${selectedCustomer.customerID}`);
                toast.success('Customer deleted successfully');
                setSelectedCustomer(null);
                fetchCustomers();
            } catch (error) {
                toast.error('Error deleting customer');
                console.error('Error deleting customer:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdateCustomer = async () => {
        if (selectedCustomer) {
            
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <Toaster position="top-center" />
            <div className="mb-4">
                <select onChange={handleCustomerSelect} className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.customerID} value={customer.customerID}>{customer.name}</option>
                    ))}
                </select>
            </div>
            {loading && <div>Loading...</div>}
            {selectedCustomer && (
                <div className="p-4 bg-white shadow-lg rounded">
                    <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p><strong>Description:</strong> {selectedCustomer.description}</p>
                    <p><strong>Email:</strong> {selectedCustomer.contactInfo.email}</p>
                    <p><strong>Phone:</strong> {selectedCustomer.contactInfo.phone}</p>
                    <p><strong>Current Balance:</strong> ${selectedCustomer.currentBalance.toFixed(2)}</p>
                    <div className="mt-4">
                        <button 
                            onClick={handleDeleteCustomer} 
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mr-2"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={handleUpdateCustomer} 
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDetails;
