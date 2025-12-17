import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data.success ? res.data.products : [];
};

export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/payment/all`);
  return res.data.success ? res.data.orders : [];
};

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/auth/users`);
  return res.data.success ? res.data.users : [];
};
