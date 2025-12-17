import React from "react";

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-xl w-80 shadow-xl">
        <h3 className="text-lg font-bold mb-4">{message}</h3>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
