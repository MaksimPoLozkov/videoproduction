// types/order.ts
export interface Client {
  id: number;
  name: string;
  // другие поля клиента
}

export interface Service {
  id: number;
  name: string;
  price: number;
  // другие поля услуги
}

export interface OrderFormProps {
  clients: Client[];
  services: Service[];
}