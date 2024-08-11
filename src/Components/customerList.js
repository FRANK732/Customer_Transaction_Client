import React from 'react';

const CustomerList = ({ customers }) => {
    return (
        <ul className="mt-4 w-1/3 mx-auto">
            {customers.map(customer => (
                <li key={customer.customerID} className="p-4  bg-gray-100 mb-2 rounded shadow">
                    {customer.name} - Balance: ${customer.currentBalance.toFixed(2)}
                </li>
            ))}
        </ul>
    );
};

export default CustomerList;
