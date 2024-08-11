import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Contants/constants';
import { Toaster, toast } from 'sonner'


const CustomerForm = ({ fetchCustomers }) => {
    const [customer, setCustomer] = useState({ 
        name: '', 
        description: '', 
        contactInfo: { email: '', phone: '' }, 
        currentBalance: 0 
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('contactInfo.')) {
            const key = name.split('.')[1];
            setCustomer({
                ...customer,
                contactInfo: {
                    ...customer.contactInfo,
                    [key]: value
                }
            });
        } else {
            setCustomer({ ...customer, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/CFPContrller/CreateCustomer`, customer);
            setCustomer({ 
                name: '', 
                description: '', 
                contactInfo: { email: '', phone: '' }, 
                currentBalance: 0 
            });
            fetchCustomers();
            toast.success('Successfully Created Customer')
        } catch (error) {
            console.error('Error saving customer:', error);
            toast.error('Error Creating Customer');
        }
    };

    return (
        <>
        <Toaster position='top-left' richColors/>
         <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={customer.name} 
                onChange={handleInputChange} 
                required 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                value={customer.description} 
                onChange={handleInputChange} 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input 
                type="text" 
                name="contactInfo.email" 
                placeholder="Email" 
                value={customer.contactInfo.email} 
                onChange={handleInputChange} 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input 
                type="text" 
                name="contactInfo.phone" 
                placeholder="Phone" 
                value={customer.contactInfo.phone} 
                onChange={handleInputChange} 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input 
                type="number" 
                name="currentBalance" 
                placeholder="Balance" 
                value={customer.currentBalance} 
                onChange={handleInputChange} 
                required 
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Save Customer
            </button>
        </form>
        </>
       
    );
};

export default CustomerForm;
