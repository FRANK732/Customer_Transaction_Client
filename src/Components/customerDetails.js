import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Contants/constants";
import { Toaster, toast } from "sonner";
import { FiEdit2 } from "react-icons/fi";

const CustomerDetails = ({ customers, fetchCustomers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCustomerSelect = async (e) => {
    const customerId = e.target.value;
    if (customerId) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/CFPContrller/GetCustomerById/${customerId}`
        );
        setSelectedCustomer(response.data);
        setIsEditing(false);
      } catch (error) {
        toast.error("Error fetching customer details");
        console.error("Error fetching customer details:", error);
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
        await axios.delete(
          `${BASE_URL}/CFPContrller/DeleteCustomer/${selectedCustomer.customerID}`
        );
        toast.success("Customer deleted successfully");
        setSelectedCustomer(null);
        fetchCustomers();
      } catch (error) {
        toast.error("Error deleting customer");
        console.error("Error deleting customer:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateCustomer = async () => {
    if (selectedCustomer) {
      setLoading(true);
      try {
        const updateData = {
          name: selectedCustomer.name,
          description: selectedCustomer.description,
          contactInfo: {
            email: selectedCustomer.contactInfo.email,
            phone: selectedCustomer.contactInfo.phone,
          },
        };

        await axios.put(
          `${BASE_URL}/CFPContrller/UpdateCustomer?customerid=${selectedCustomer.customerID}`,
          updateData
        );
        toast.success("Customer updated successfully");
        setIsEditing(false);
        fetchCustomers();
      } catch (error) {
        toast.error("Error updating customer");
        console.error("Error updating customer:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      contactInfo: {
        ...prevCustomer.contactInfo,
        [name]: value,
      },
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Toaster position="top-center" />
      <div className="mb-4">
        <select
          onChange={handleCustomerSelect}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.customerID} value={customer.customerID}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      {loading && <div>Loading...</div>}
      {selectedCustomer && (
        <div className="p-4 bg-white shadow-lg rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Customer Details</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-500"
            >
              <FiEdit2 size={24} />
            </button>
          </div>
          {isEditing ? (
            // Edit Mode
            <div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={selectedCustomer.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={selectedCustomer.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={selectedCustomer.contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={selectedCustomer.contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleUpdateCustomer}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div>
              <p>
                <strong>Name:</strong> {selectedCustomer.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedCustomer.description}
              </p>
              <p>
                <strong>Email:</strong> {selectedCustomer.contactInfo.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedCustomer.contactInfo.phone}
              </p>
              <p>
                <strong>Current Balance:</strong> GHS-
                {selectedCustomer.currentBalance.toFixed(2)}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleDeleteCustomer}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
