import styles from './Banner.module.css';
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className={styles['main-baner__container']}>
      <div  className={styles['main-container']}>
        <div className={styles['main-baner-text']}>
          <h2 className={styles['main-baner-text__logo']}>CRAFTMERGE</h2>
          <h3 className={styles['main-baner-text__explanation']}>Обʼєднуємо крафтових виробників та інноваторів</h3>
          <Link to="/about-us" className={styles['main-banner-link__container']}>
            <div className={styles['main-banner-link']}>
              Детальніше про нас
            </div>
          </Link>
        </div>
        <div>
          <img className={styles['main-banner__img']}
            src={`${process.env.REACT_APP_PUBLIC_URL}/img/main-baner.png`}
            alt="Banner img"
          />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
