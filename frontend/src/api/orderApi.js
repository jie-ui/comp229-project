import api from "./axios";

export const createOrder = (payload) => api.post("/orders", payload);
export const listMyOrders = () => api.get("/orders");
export const getMyOrder = (id) => api.get(`/orders/${id}`);
export const updateMyOrder = (id, payload) => api.put(`/orders/${id}`, payload);
export const deleteMyOrder = (id) => api.delete(`/orders/${id}`);
