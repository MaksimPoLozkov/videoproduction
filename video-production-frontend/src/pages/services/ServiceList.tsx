import { useEffect, useState } from 'react';
import { getServices } from '../../api/services';
import styles from './ServicesList.module.css';


interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  
}

export const ServicesList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices(); 
        console.log(response.data);
        setServices(response.data);
      } catch (err) {
        setError('Ошибка при загрузке услуг');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Загрука...</div>;
  if (error) return <div>{error}</div>;

    return (
    <div className={styles.container}>
        <h1 className={styles.title}>Услуги</h1>
        <div className={styles.grid}>
        {services.map((service) => (
            <div key={service.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{service.title}</h2>
            <p className={styles.cardDescription}>{service.description}</p>
            <p className={styles.cardPrice}>{service.price} ₽</p>
            </div>
        ))}
        </div>
    </div>
    );
};