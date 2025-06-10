import { ServicesList } from "./pages/services/ServiceList";
import { Header } from "./components/Header";
import { Main } from "./components/main/Main";
import { OrderForm } from "./components/OrderForm";
import styles from './App.module.css'


function App() {
  return (
    <div className={styles.bgc}>
      <Header />
      <Main />
      <ServicesList />
      <OrderForm />
    </div>
  );
}
export default App;