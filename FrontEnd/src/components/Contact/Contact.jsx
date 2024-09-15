import LinkContainer from '../CookiesPolicyPage/LinkContainer.jsx';
import styles from './Contact.module.css';
import contactText from './text';
import useScrollToTop from '../../hooks/useScrollToTop';
import React, { useState } from 'react';
import {
    EMAIL_PATTERN,
    MESSAGE_PATTERN
} from '../../constants/constants';

const Contact = () => {
  useScrollToTop();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Привіт, хочу повідомити...');
  const [category, setCategory] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Validate email using EMAIL_PATTERN
    if (!EMAIL_PATTERN.test(value)) {
      setEmailError('Електронна пошта не відповідає вимогам');
    } else {
      setEmailError('');
    }
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setMessage(value);

    // Validate message length using MESSAGE_PATTERN
    if (!MESSAGE_PATTERN.test(value)) {
      setMessageError('Повідомлення не може бути коротшим за 10 символів');
    } else {
      setMessageError('');
    }
  };

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setEmailError('Електронна пошта не відповідає вимогам');
      return;
    }

    if (!MESSAGE_PATTERN.test(message)) {
      setMessageError('Повідомлення не може бути коротшим за 10 символів');
      return;
    }

    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Category:', category);
  };

  return (
    <div className={styles['contact_container']}>
      <div className={styles['contact__link_container']}>
        <LinkContainer />
        <img
          className={styles['contact__img1']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_12x10.png`}
          alt="dots_12x10.png"
        />
      </div>
      <div className={styles['contact__text_container']}>
        <h2 className={styles['contact__title']}>{contactText.title}</h2>
        <form onSubmit={handleSubmit} className={styles['contact__form']}>
          <label className={styles['contact__label']} htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles['contact__input']}
            placeholder="Ваша пошта"
            required
          />
          {/* Show email validation error */}
          {emailError && <p className={styles['contact__error']}>{emailError}</p>}

          <label className={styles['contact__label']} htmlFor="category">Категорія:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={`${styles['contact__select']} ${category === '' ? styles['placeholder'] : ''}`}
            required
          >
            <option value="" disabled>Будь ласка, оберіть тип повідомлення</option>
            <option value="Технічне питання">Технічне питання</option>
            <option value="Рекомендації">Рекомендації</option>
            <option value="Питання">Питання</option>
            <option value="Інше">Інше</option>
          </select>

          <label className={styles['contact__label']} htmlFor="message">Повідомлення:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            className={styles['contact__textarea']}
            placeholder="Ваше повідомлення"
            required
          />
          {/* Show message validation error */}
          {messageError && <p className={styles['contact__error']}>{messageError}</p>}

          <button type="submit" className={styles['contact__button_send']}>Надіслати</button>
          <button type="button" className={styles['contact__button_cancel']}>Відмінити</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
