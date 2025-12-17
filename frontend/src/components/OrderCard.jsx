import React from "react";

const OrderCard = ({ order, onCancel }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 p-5 rounded-xl mb-5">
      <h3 className="text-xl font-bold text-yellow-400 mb-2">
        Order ID: {order._id}
      </h3>

      <p className="text-gray-300">Name: {order.userDetails.name}</p>
      <p className="text-gray-300">Phone: {order.userDetails.phone}</p>
      <p className="text-gray-300 mb-3">Address: {order.userDetails.address}</p>

      <h4 className="text-yellow-400 font-bold mb-2">Items:</h4>

      {order.items.map((item, index) => (
        <div key={index} className="flex gap-4 mb-3">
          <img
            src={item.image}
            className="w-16 h-16 rounded-xl object-cover border border-yellow-400"
          />
          <div>
            <p>{item.title}</p>
            <p>₹{item.price} × {item.qty}</p>
          </div>
        </div>
      ))}

      <p className="text-yellow-400 text-xl font-bold">
        Total: ₹{order.totalAmount}
      </p>

      <button
        onClick={() => onCancel(order._id)}
        className="mt-4 px-4 py-2 bg-red-600 rounded-xl"
      >
        Cancel Order
      </button>
    </div>
  );
};

export default OrderCard;
