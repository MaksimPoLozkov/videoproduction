import React, { useState, useEffect } from 'react';
import styles from './OrderForm.module.css'; 

interface Order {
  name: string;
  phone: string;
  address: string;
  serviceId: string;
  description: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
}

export const OrderForm = () => {
  const [order, setOrder] = useState<Order>({
    name: '',
    phone: '',
    address: '',
    serviceId: '',
    description: ''
  });

  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/services', {
          headers: {
            'Accept': 'application/json'
          }
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Сервер вернул не JSON-ответ');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error('Ошибка загрузки услуг:', err);
        setError('Ошибка загрузки услуг. Пожалуйста, обновите страницу.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: order.name,
          phoneNumber: order.phone,  
          address: order.address,
          serviceId: Number(order.serviceId),
          description: order.description
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при отправке заказа');
      }

      setOrder({
        name: '',
        phone: '',
        address: '',
        serviceId: '',
        description: ''
      });

      alert('Ваш заказ успешно отправлен!');
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Произошла неизвестная ошибка');
      console.error('Ошибка:', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        Загрузка списка услуг...
      </div>
    );
  }

  if (error && !services.length) {
    return (
      <div className={styles.errorContainer}>
        Ошибка: {error}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Форма заказа услуги</h2>
      
      {error && (
        <div className={styles.errorMessage}>
          Ошибка: {error}
        </div>
      )}
      
      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          value={order.name}
          onChange={handleChange}
          required
          className={styles.formControl}
          placeholder="ваше имя"
        />
      </div>
      
      <div className={styles.formGroup}>
        <input
          type="tel"
          name="phone"
          value={order.phone}
          onChange={handleChange}
          required
          className={styles.formControl}
          placeholder="ваш номер телефона"
        />
      </div>
      
      <div className={styles.formGroup}>
        <input
          type="text"
          name="address"
          value={order.address}
          onChange={handleChange}
          required
          className={styles.formControl}
          placeholder="где вы живете?"
        />
      </div>
      
      <div className={styles.formGroup}>
        <select
          name="serviceId"
          value={order.serviceId}
          onChange={handleChange}
          required
          className={styles.formControl}
          disabled={!services.length}
        >
          <option value="">выберите услугу</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.title} - {service.price.toLocaleString('ru-RU')} ₽
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <textarea
          name="description"
          value={order.description}
          onChange={handleChange}
          rows={4}
          className={styles.textarea}
          placeholder="опишите проект"
        />
      </div>
      
      <button
        type="submit"
        className={`${styles.submitButton} ${
          submitLoading ? styles.submitButtonLoading : ''
        }`}
        disabled={submitLoading}
      >
        {submitLoading ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
};