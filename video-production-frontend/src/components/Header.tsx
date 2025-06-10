


import styles from './Header.module.css'; 
import logo from './Склейка.png'; 

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        
        <div className={styles.logoContainer}>
          <img src={logo} alt="" className={styles.logo} />
        </div>

        
        <nav className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}><a >Цены</a></li>
            <li className={styles.menuItem}><a >Услуги</a></li>
            <li className={styles.menuItem}><a>Портфолио</a></li>
            <li className={styles.menuItem}><a>Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

