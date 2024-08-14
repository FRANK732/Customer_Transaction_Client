const Modal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-80">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this customer?</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  
  export default Modal;