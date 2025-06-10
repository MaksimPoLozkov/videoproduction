import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface OrderData {
  clientId: number;
  serviceId: number;
  amount: number;
}

export const createOrder = (orderData: OrderData) => {
  return api.post('/orders', orderData);
};

export const getOrders = () => {
  return api.get('/orders');
};

export const getClients = () => {
  return api.get('/orders');
};

