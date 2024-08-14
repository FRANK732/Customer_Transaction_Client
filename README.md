
## Instructions

- **Customer Management**: Add, update, and delete customer records.
- **Transaction Processing**: Issue invoices and record payments with balance updates.
- **Transaction Reports**: Generate detailed reports showing debits, credits, and balances.
- **Chronological Sorting**: Transactions are always sorted by date.

## Prerequisites

- **SQL Server 2019** 
- **.NET Core SDK Version 6**
- **Javascript** for running the frontend

## Installation

### Backend Installation

#### Option 1: Restore Database Backup

1. Download the `CustomerPlat.bak` file.
2. Open SQL Server Management Studio (SSMS) and connect to your SQL Server instance.
3. Right-click on the **Databases** node in Object Explorer and select **Restore Database...**.
4. Choose **Device**, click **Add**, and select the `CustomerPlat.bak` file.
5. Click **OK** to restore the database.

#### Option 2: Run ASP.NET Migrations

1. Ensure your connection string in `appsettings.json` is set to your SQL Server instance or default string can be used.
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CustomerPlat;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False"
   }
   ```
2. Open the project.
3. Open the **Package Manager Console** in your IDE and run:
   ```bash
   Update-Database
   ```
5. This will apply any migrations and create the database schema.
6. Or
7. Run
   ```bash
   Add-Migration initial
   ```
8. This generate migration file after run command in 3
   
   

### Frontend Installation

1. Navigate to the `frontend` directory:

2. Install the required dependencies using npm:
   ```bash
   npm install
   ```
3. Ensure that the frontend is configured to interact with the backend API:
   - Open the `src/constant/constants.js`to verify the `BASE_URL` points to the correct backend API endpoint, e.g.:
     ```javascript
     export const BASE_URL = "http://localhost:7172/api";
     ```
4. Start the frontend development server:
   ```bash
   npm start
   ```
   - The application should open automatically in your default web browser at `http://localhost:3000` make sure the application run in this port to avoid any CORS Policy.


## API Endpoints

### 1. **Get All Customers**
   - **Endpoint**: `GET api/CFPContrller/GetAllCustomers`
   - **Description**: Retrieves a list of all customers.
   - **Response**: Returns a collection of `CustomerDto` objects.

### 2. **Get Customer by ID**
   - **Endpoint**: `GET api/CFPContrller/GetCustomerById/{id:int}`
   - **Description**: Retrieves a specific customer by their unique ID.
   - **Parameters**:
     - `id` (int): The unique identifier of the customer.
   - **Response**: Returns the `CustomerDto` object for the specified customer. If the customer is not found, returns a `404 Not Found` status.

### 3. **Get Transaction by ID**
   - **Endpoint**: `GET api/CFPContrller/GetTransactionById?transactionID={transactionID}`
   - **Description**: Retrieves a specific transaction by its unique transaction ID.
   - **Parameters**:
     - `transactionID` (string): The unique identifier of the transaction.
   - **Response**: Returns the transaction details.

### 4. **Generate Transaction Report**
   - **Endpoint**: `GET api/CFPContrller/GenerateTransactionReportAsync?customerId={customerId}&startDate={startDate}&endDate={endDate}`
   - **Description**: Generates a transaction report for a specific customer within a given date range.
   - **Parameters**:
     - `customerId` (int): The unique identifier of the customer.
     - `startDate` (DateTime?, optional): The start date for the report. If not provided, defaults to the first available transaction date.
     - `endDate` (DateTime?, optional): The end date for the report. If not provided, defaults to today's date.
   - **Response**: Returns a list of transactions for the specified customer within the date range.

### 5. **Create Customer**
   - **Endpoint**: `POST api/CFPContrller/CreateCustomer`
   - **Description**: Creates a new customer.
   - **Parameters**:
     - `Customer` (body): The customer object containing details like name, description, and contact information.
   - **Response**: Returns the created `CustomerDto` object along with a `201 Created` status and a location header pointing to the newly created resource.

### 6. **Create Transaction**
   - **Endpoint**: `POST api/CFPContrller/CreateTransaction`
   - **Description**: Creates a new transaction (invoice or payment).
   - **Parameters**:
     - `Transaction` (body): The transaction object containing details like amount, transaction type, and customer ID.
   - **Response**: Returns the created transaction details with a `201 Created` status and a location header pointing to the newly created transaction.

### 7. **Update Customer**
   - **Endpoint**: `PUT api/CFPContrller/UpdateCustomer?customerid={customerid}`
   - **Description**: Updates an existing customer's details.
   - **Parameters**:
     - `customerid` (int): The unique identifier of the customer to be updated.
     - `UpdateCustomer` (body): The updated customer details.
   - **Response**: Returns `200 OK` if the update is successful, or `404 Not Found` if the customer doesn't exist.

### 8. **Delete Customer**
   - **Endpoint**: `DELETE api/CFPContrller/DeleteCustomer/{id}`
   - **Description**: Deletes a specific customer by their unique ID.
   - **Parameters**:
     - `id` (int): The unique identifier of the customer to be deleted.
   - **Response**: Returns `200 OK` if the deletion is successful, or `404 Not Found` if the customer doesn't exist.

---

## Testing

- The application has been tested for typical scenarios. However, you can run additional tests to explore edge cases.


## Contact

If you have any questions or issues, feel free to contact:

- **Name**: Frank Addai
- **Email**:hacphran122@gmail.com

---
