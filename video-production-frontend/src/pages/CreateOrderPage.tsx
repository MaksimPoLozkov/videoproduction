
import { OrderForm } from '../components/OrderForm';

export const CreateOrderPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
      <OrderForm />
    </div>
  );
};